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
  currentRoom: string = 'best chatroom ever' // to pass to chat-room component

  constructor(private client: ClientService) {}

  // When submitting to the waiting room form.
  async connectToRoom(form: FormGroup) {
    this.setupConnection()
    await this.startConnection(form)
  }


  // SignalR Client Connection Functions
  
  private setupConnection() {
    this.clientConnection = this.client.buildConnection()
    
    // Setup a client-side handler for incoming messages sent from the server. (specifically messages with the name/method "ReceiveMessage")
    this.clientConnection.on("ReceiveMessage",(username,msg) => {
      console.log("username: ", username)
      console.log("msg: ",msg)
    })

    // For messages sent by users
    this.clientConnection.on("ReceiveGeneralMessage",(username,msg) => {
       console.log("USERNAME: ",username)
       console.log("MSG: ",msg)
    })
  }
  private async startConnection(form: FormGroup) {
    try {
      await this.clientConnection?.start()

      const payload = {
        username: form.controls['username'].value,
        roomtojoin: form.controls['chatroom'].value
      }

      await this.clientConnection?.invoke("JoinChatRoom",payload)  
    } catch (error) {
      console.log("OOPS ERROR DETECTED: ",error)
    }
  }
}
