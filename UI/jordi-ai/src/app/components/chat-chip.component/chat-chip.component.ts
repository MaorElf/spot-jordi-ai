import {
    Component,
    ChangeDetectionStrategy,
    Input
} from '@angular/core';

import {AsyncPipe, NgClass, NgForOf} from '@angular/common';
import {RouterOutlet} from '@angular/router';

export type ChipType = 'positive' | 'negative';

@Component({
    selector:        'spt-chat-chip',
    standalone:      true,
    imports:         [RouterOutlet, NgForOf, AsyncPipe, NgClass],
    templateUrl:     './chat-chip.component.html',
    styleUrls:       ['./chat-chip.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
class ChatChipComponent {

  @Input() type: ChipType = 'positive';
}

export {ChatChipComponent};
