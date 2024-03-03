import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {JordiPanelComponent} from "./components/jordi-panel/jordi-panel.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, JordiPanelComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular-jordi';
}
