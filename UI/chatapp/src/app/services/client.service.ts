import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor() { }


  buildConnection() : HubConnection {
    return new HubConnectionBuilder().withUrl("chat-hub").configureLogging(LogLevel.Information).build()
  }
}
