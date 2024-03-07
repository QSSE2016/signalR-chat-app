import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ClientService } from '../services/client.service';

@Component({
  selector: 'app-waiting-room',
  templateUrl: './waiting-room.component.html',
  styleUrls: ['./waiting-room.component.css']
})
export class WaitingRoomComponent{
  form: FormGroup
  @Output() submitEvent = new EventEmitter<FormGroup>();

  constructor() {
    this.form = new FormGroup({
      username: new FormControl('',Validators.required),
      chatroom: new FormControl('',Validators.required)
    })
  }
  
  onSubmit() {
    if(this.form.invalid) {
      alert("Please fill out all the fields.")
      return
    }

    this.submitEvent.emit(this.form)
  }
}
