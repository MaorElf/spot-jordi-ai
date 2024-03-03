import { Component, ChangeDetectionStrategy } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

import {ReactiveFormsModule, FormControl} from "@angular/forms";


@Component({
  selector: 'app-jordi-panel',
  standalone: true,
  imports: [InputTextModule, ReactiveFormsModule, ButtonModule],
  templateUrl: './jordi-panel.component.html',
  styleUrl: './jordi-panel.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class JordiPanelComponent {
  chatInput = new FormControl<string>('');

  inputPlaceholder = 'Ask me to do things like update cluster’s shutdown hours or get information about '
}
