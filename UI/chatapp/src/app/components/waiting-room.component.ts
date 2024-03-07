import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HubConnection } from '@microsoft/signalr';
import { ClientService } from '../services/client.service';

@Component({
  selector: 'app-waiting-room',
  templateUrl: './waiting-room.component.html',
  styleUrls: ['./waiting-room.component.css']
})
export class WaitingRoomComponent {
  form: FormGroup
  clientConnection?: HubConnection

  constructor(private client: ClientService) {
    this.form = new FormGroup({
      username: new FormControl('',Validators.required),
      chatroom: new FormControl('',Validators.required)
    })
  }

  async onSubmit() {
    if(this.form.invalid) {
      alert("Please fill out all the fields.")
      return
    }


    this.setupConnection()
    await this.startConnection()
  }

  // Again, this will be moved later, just makign sure everything works as intented
  setupConnection() {
    // this code will be moved elsewhere probably
    this.clientConnection = this.client.buildConnection()
    
    // Setup a client-side handler for incoming messages sent from the server. (specifically messages with the name/method "ReceiveMessage")
    this.clientConnection.on("ReceiveMessage",(username,msg) => {
      console.log("username: ", username)
      console.log("msg: ",msg)
    })
  }

  async startConnection() {
    try {
      await this.clientConnection?.start()
      alert("Connection started!")
      await this.clientConnection?.invoke("JoinChatRoom", this.form.controls['username'],this.form.controls['chatroom'])  
    } catch (error) {
      console.log("OOPS ERROR DETECTED: ",error)
    }
  }


  
}
