import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.css']
})
export class ChatRoomComponent {
  @Input() roomName: string = ''
  @Input() messagesInRoom: Array<string> = []
  @Output() sendMessageEvent = new EventEmitter<string>()
  sendMessageForm: FormGroup
  
  constructor() { this.sendMessageForm = new FormGroup({message: new FormControl('',Validators.required)})}

  sendMessage() {
    // Don't think i need to inform the user that blank messsages aren't really messages...
    if(this.sendMessageForm.invalid)
      return

    this.sendMessageEvent.emit(this.sendMessageForm.controls['message'].value)
    this.sendMessageForm.controls['message'].setValue('')
  }
}
