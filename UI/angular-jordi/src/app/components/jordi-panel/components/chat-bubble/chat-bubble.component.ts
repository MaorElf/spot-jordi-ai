import {Component, input, Input, OnInit} from '@angular/core';
import {ChatMessage, User} from "../../../../types/jordi.types";

@Component({
  selector: 'app-chat-bubble',
  standalone: true,
  imports: [],
  templateUrl: './chat-bubble.component.html',
  styleUrl: './chat-bubble.component.css'
})
export class ChatBubbleComponent implements OnInit {

  @Input() message!: ChatMessage;

  user = input<User>({
    userId: '123',
    name: 'Ben Grinstein',
    orgId: '456'
  });

  // message!: string;

  jordiImg = 'assets/images/avatar.svg';

  userInitials: string = '';

  ngOnInit(): void {

  }

//   add function that gets the initials of the user
  private getInitials(user: User) {
    return this.user.name.split(' ').map((n) => n[0]).join('');
  }


}
