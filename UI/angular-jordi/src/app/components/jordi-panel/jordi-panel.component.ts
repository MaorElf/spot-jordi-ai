import {Component, ChangeDetectionStrategy, inject, OnInit} from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

import {ReactiveFormsModule, FormControl} from "@angular/forms";
import {ChatService} from "../../services/chat.service";
import {tap} from "rxjs";


@Component({
  selector: 'app-jordi-panel',
  standalone: true,
  imports: [InputTextModule, ReactiveFormsModule, ButtonModule],
  templateUrl: './jordi-panel.component.html',
  styleUrl: './jordi-panel.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class JordiPanelComponent implements OnInit {

  message: string = '';
  messages: string[] = [];
  chatInput = new FormControl<string>('');

  inputPlaceholder = 'Ask me to do things like update cluster’s shutdown hours or get information about '

  private chatService: ChatService = inject(ChatService);


  ngOnInit(): void {
      this.chatService.getMessages().pipe(
        tap(({message}: { message: string }) => {
          this.messages.push(message);
        })
      ).subscribe();
    }

    sendMessage() {
      this.chatService.sendMessage(this.chatInput.value as string);
      this.message = '';
    }


}
