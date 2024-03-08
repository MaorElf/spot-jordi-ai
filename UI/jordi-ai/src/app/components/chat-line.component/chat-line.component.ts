import {
    Component,
    ChangeDetectionStrategy,
    Input,
    OnInit,
    ChangeDetectorRef, Output, EventEmitter
} from '@angular/core';

import {AsyncPipe, NgForOf, NgTemplateOutlet} from '@angular/common';
import {from, of} from 'rxjs';
import {concatMap} from 'rxjs/operators';
import {delay} from 'rxjs/internal/operators';


@Component({
    selector:        'spt-chat-line',
    standalone:      true,
    imports:         [NgForOf, AsyncPipe, NgTemplateOutlet],
    templateUrl:     './chat-line.component.html',
    styleUrls:       ['./chat-line.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
class ChatLineComponent implements OnInit {
  @Input() line: string = 'The red fox jumps over the lazy dog.';

  @Input() shouldFade: boolean;

  @Output() wordUpdated: EventEmitter<string> = new EventEmitter();

  words: string[] = [];

  constructor(private cd: ChangeDetectorRef) {
  }

  ngOnInit() {
      from(this.line.split(' ')).pipe(
          concatMap(word => of(word).pipe(delay(Math.random() * 400)))).subscribe(value => {
          this.words.push(value);
          this.cd.detectChanges();

          if(this.words.length % 3 === 0) {
              this.wordUpdated.emit(this.words.join(' '));
          }
      });
  }
}

export {ChatLineComponent};
