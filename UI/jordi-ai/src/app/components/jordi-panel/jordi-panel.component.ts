import {
    Component,
    ChangeDetectionStrategy,
    inject,
    OnInit,
    Output,
    EventEmitter,
    ElementRef, ViewChild, AfterViewInit, Input
} from '@angular/core';
import {ButtonModule} from 'primeng/button';
import {ReactiveFormsModule, FormControl} from '@angular/forms';
import {ChatLineComponent} from '../chat-line.component/chat-line.component';
import {NgForOf, AsyncPipe, NgIf, NgClass} from '@angular/common';
import {
    ChatBubbleComponent
} from './component/chat-bubble/chat-bubble.component';
import {Account, LocalStorageService, SCS_ORGANIZATION_PROVIDER_TOKEN} from '@spotinst/spot-client-shared';
import {ChatMessage, SOCKET_EVENT, Source, User, UserCookie} from '../../types/jordi.type';
import {ChatService} from '../../services/chat.service';
import {combineLatest, interval, Observable, of} from 'rxjs';
import {map, startWith, switchMap, take, tap} from 'rxjs/operators';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {MatIconModule} from '@angular/material/icon';
import {ChatChipComponent} from '../chat-chip.component/chat-chip.component';
import {delay} from 'rxjs/internal/operators';
import {
    ChatHeaderComponent
} from '../chat-header.component/chat-header.component';
import {JordiThreeDComponent} from './component/jordi-three-d/jordi-three-d.component';
import {AudioRecorderService} from './audio-recorder.service';
import {AUTH_PROVIDER_TOKEN} from '../../client-cores-services-integration/auth-provider.token';
import {
    Organization
} from '@spotinst/spot-client-core-services-types/app/services/organization/models/organization.model';
import {CdkDrag, CdkDragHandle} from '@angular/cdk/drag-drop';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@Component({
    selector:   'spt-jordi-panel',
    standalone: true,
    imports:    [
        ReactiveFormsModule,
        ButtonModule,
        ChatLineComponent,
        NgForOf,
        ChatBubbleComponent,
        AsyncPipe,
        InputTextareaModule,
        MatIconModule,
        ChatChipComponent,
        ChatHeaderComponent,
        NgIf,
        ChatChipComponent,
        JordiThreeDComponent,
        CdkDrag,
        CdkDragHandle,
        MatProgressSpinnerModule,
        NgClass
    ],
    templateUrl:     './jordi-panel.component.html',
    styleUrls:       ['./jordi-panel.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
class JordiPanelComponent implements OnInit, AfterViewInit {
  @Output() closeJordiPanel = new EventEmitter<void>();

  _start = false;

  @Input() set start(value: boolean) {
      if (value && this._start === false) {
          this._start = value;
      }
  }

  @ViewChild('chat') chat?: ElementRef;

  public chatInput = new FormControl<string>('');

  public inputPlaceholder = 'Ask me to do things like update cluster’s shutdown hours or get information about ';

  private localStorageService = inject(LocalStorageService);

  private chatService: ChatService = inject(ChatService);

  private organizationProvider = inject(SCS_ORGANIZATION_PROVIDER_TOKEN);

  private currentAccount$ = inject(AUTH_PROVIDER_TOKEN).currentAccount$

  user!: User;

  private organizationId: string;

  currentOrganization$ = this.organizationProvider.currentOrganization$;

  oldMessages$ = combineLatest([this.currentOrganization$, this.currentAccount$]).pipe(
      take(1),
      tap(([organization, currentAccount]: [Organization, Account]) => {
          const currentAccountId = currentAccount.id;

          this.organizationId = organization.id;
          this.chatService.createChat(
              this.user.userId,
              organization.id,
              currentAccountId
          );
      }), switchMap(() => this.chatService.getMessages(SOCKET_EVENT.CREATE_CHAT).pipe(
          map(({messages}) => messages)
      ))
  );

  newMessages$ = this.chatService.getMessages(SOCKET_EVENT.NEW_MESSAGE).pipe(
      map(({messages}) => messages)
  );

  messages$: Observable<ChatMessage[]> = combineLatest([
      this.oldMessages$,
      this.newMessages$.pipe(
          startWith([]),
          tap((value: ChatMessage[]) => {
              if (value.length > 0 && value[value.length -1].sender === Source.jordi) {
                  this.isLoading = false;
              }
          })
      )
  ]).pipe(
      map(([old, newItems]) => {
          return newItems.length > 0 ? newItems : old;
      })
  )

  public chips$: Observable<string[]> = of(['No Thanks.', 'Sure!', 'Maybe Later', 'Yes']);

  public showOnlyLastMessage = false;

  public lastJordiMessage: ChatMessage;

  private audioRecorderService = inject(AudioRecorderService);

  public isRecording$ = this.audioRecorderService.isRecording$;

  public isLoading: boolean = false;

  ngOnInit(): void {
      const userCookie: UserCookie = this.localStorageService.get('UserCookie') as UserCookie;

      this.user = {
          userId: userCookie.id,
          name:   userCookie.firstName + ' ' + userCookie.lastName
      };
  }

  ngAfterViewInit() {
      this.audioRecorderService.init();
      this.messages$.pipe(delay(2000)).subscribe((messages) => {
          const onlyJordiMessages = messages.filter(message => message.sender === 'jordi');

          this.lastJordiMessage = onlyJordiMessages[onlyJordiMessages.length - 1];
      });
  }

  sendMessage(message: string) {
      message = message.trim() ? message : this.chatInput.value;

      if (message) {
          this.scrollToBottom();
          this.isLoading = true;

          this.chatService.sendMessage(message, this.user.userId, this.organizationId);
          this.chatInput.setValue('');
      }


  }

  onSendClick() {
      this.sendMessage(this.chatInput.value);
  }

  closeJordi() {
      this.closeJordiPanel.emit();
  }

  startListen() {
      this.audioRecorderService.startRecording();
  }

  stopRecord() {
      this.audioRecorderService.stopRecording();
  }

  scrollToBottom() {
      interval(100).pipe(take(1)).subscribe(() => this.chat.nativeElement.scrollTop = this.chat.nativeElement.scrollHeight);
  }
}

export {JordiPanelComponent};
