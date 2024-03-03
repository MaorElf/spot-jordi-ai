import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {io} from "socket.io-client";

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private socket = io('http://localhost:5000');

  sendMessage(message: string){
    this.socket.emit('new-message', message);
  }

  getMessages() {
    const observable = new Observable<{ message: string }>(observer => {
      this.socket.on('new-message', (data) => {
        observer.next(data);
      });
      return () => { this.socket.disconnect(); };
    });

    return observable;
  }
}
