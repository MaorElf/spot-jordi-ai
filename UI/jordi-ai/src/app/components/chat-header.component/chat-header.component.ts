import {
    Component,
    ChangeDetectionStrategy,
    Output, EventEmitter
} from '@angular/core';
import {NgIf} from '@angular/common';


@Component({
    selector:        'spt-jordi-header',
    standalone:      true,
    imports:         [NgIf],
    templateUrl:     './chat-header.component.html',
    styleUrls:       ['./chat-header.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
class ChatHeaderComponent {

    @Output() shrink:EventEmitter<unknown> = new EventEmitter();

    @Output() minimize:EventEmitter<unknown> = new EventEmitter();

    @Output() maximize:EventEmitter<unknown> = new EventEmitter();

    showMinimize:boolean = true;


}

export {ChatHeaderComponent};
