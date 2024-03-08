import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {io} from "socket.io-client";
import {ChatMessage, SOCKET_EVENT, SocketEvent} from "../types/jordi.type";
import {isString} from "lodash";

@Injectable({
    providedIn: 'root'
})
export class ChatService {
    private socket = io('http://localhost:7321');

    createChat(userId: number, orgId: string, accountId: string): void {
        this.socket.emit(SOCKET_EVENT.CREATE_CHAT, { userId, orgId, accountId});
    }

    sendMessage(message: string, userId: number, orgId: string){
        this.socket.emit(SOCKET_EVENT.NEW_MESSAGE, { message, userId, orgId});
    }

    getMessages(event: SocketEvent): Observable<{ messages: ChatMessage[] }> {
        return new Observable<{ messages: ChatMessage[] }>(observer => {
            this.socket.on(event, (data) => {
                const isDataString = isString(data);
                const nextObject = isDataString ? JSON.parse(data) : data
                observer.next(nextObject);
            });

            return () => {
                this.socket.disconnect();
            };
        });
    }


}
