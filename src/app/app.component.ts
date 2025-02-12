import { Component } from '@angular/core';
import { CtaSectionComponent } from './features/cta-section/cta-section.component';


@Component({
  selector: 'app-root',
  imports: [
    CtaSectionComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: true
})
export class AppComponent {
  title = 'your-app-name';
}
