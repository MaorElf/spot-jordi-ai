import {
    ChangeDetectionStrategy,
    Component, EventEmitter,
    Input,
    OnInit,
    Output
} from '@angular/core';
import {ChatMessage, Source, User} from '../../../jordi.type';
import {ChatLineComponent} from '../../../chat-line.component/chat-line.component';
import {NgIf, JsonPipe, NgClass} from '@angular/common';
import {AvatarModule} from 'primeng/avatar';

@Component({
    selector:   'app-chat-bubble',
    standalone: true,
    imports:    [
        ChatLineComponent,
        NgIf,
        AvatarModule,
        JsonPipe,
        NgClass
    ],
    templateUrl:     './chat-bubble.component.html',
    styleUrls:       ['./chat-bubble.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
class ChatBubbleComponent implements OnInit {

  @Input() message: ChatMessage;

  @Input() isLast: boolean;

  @Output() lineUpdated: EventEmitter<string> = new EventEmitter();

  @Input() user: User = {
      userId: 123,
      name:   'Ben Grinstein'
  };

  userInitials: string = '';

  sender = Source;

  ngOnInit(): void {
      this.userInitials = this.getInitials(this.user);
  }

  //   add function that gets the initials of the user
  private getInitials(user: User) {
      return user?.name?.split(' ')?.map((n) => n[0]).join('');
  }


}

export {ChatBubbleComponent};
