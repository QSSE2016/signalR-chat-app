import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.css']
})
export class ChatRoomComponent {
  @Input() roomName: string = ''
  messages: Array<string> = [] // this isn't actually what's going to be presented, just here as placeholder
  sendMessageForm: FormGroup
  
  constructor() { this.sendMessageForm = new FormGroup({message: new FormControl('',Validators.required)})}

  sendMessage() {
    // Don't think i need to inform the user that blank messsages aren't really messages...
    if(this.sendMessageForm.invalid)
      return

    console.log("Sending message")
  }
}
