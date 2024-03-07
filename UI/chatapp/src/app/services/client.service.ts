import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  // Change these to your needs (for example, your port is most likely different, ASP .NET Core pretty much always picks a new port for every solution i think)
  port = 7102
  url = 'https://localhost'
  hubRouteName = 'chat-hub'

  constructor() { }

  buildConnection() : HubConnection {
    return new HubConnectionBuilder().withUrl(`${this.url}:${this.port}/${this.hubRouteName}`).configureLogging(LogLevel.Information).build()
  }
}
