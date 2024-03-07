import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { WaitingRoomComponent } from './components/waiting-room.component';
import { ChatRoomComponent } from './components/chat-room.component';

@NgModule({
  declarations: [
    AppComponent,
    WaitingRoomComponent,
    ChatRoomComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
