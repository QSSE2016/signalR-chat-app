import { Component } from '@angular/core';
import { HubConnection } from '@microsoft/signalr';
import { ClientService } from './services/client.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'chatapp';
  clientConnection?: HubConnection
  currentRoom: string = '' // to pass to chat-room component
  roomChat: Array<string> = []

  constructor(private client: ClientService) {}

  // Main Functions
  async connectToRoom(form: FormGroup) {
    this.setupConnection()
    await this.startConnection(form)
  }

  async sendMessageToRoom(message: string) {
    try {
      await this.clientConnection?.invoke("SendMessage",message)
    } catch(error) {
      console.log("Oops,something went very wrong: ",error)
    }
  }


  // SignalR Client Connection Functions
  
  private setupConnection() {
    this.clientConnection = this.client.buildConnection()
    
    // Setup a client-side handler for incoming messages sent from the server. (specifically messages with the name/method "ReceiveMessage")
    this.clientConnection.on("ReceiveMessage",(username,msg) => {
      this.roomChat.push(`${username}: ${msg}`) // update current room chat to reflect changes
    })

    // For messages sent by users
    this.clientConnection.on("ReceiveGeneralMessage",async (username,msg) => {
      this.roomChat.push(`${username}: ${msg}`) // in this case they are both the same (the "on" handlers)
    })
  }
  private async startConnection(form: FormGroup) {
    try {
      await this.clientConnection?.start()

      const payload = {
        username: form.controls['username'].value,
        roomtojoin: form.controls['chatroom'].value
      }

      this.currentRoom = payload.roomtojoin
      await this.clientConnection?.invoke("JoinChatRoom",payload)  
    } catch (error) {
      console.log("OOPS ERROR DETECTED: ",error)
    }
  }
} 
