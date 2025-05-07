import { Component } from '@angular/core';
import { NewsletterComponent } from "./features/newsletter/newsletter.component";


@Component({
  selector: 'app-root',
  imports: [NewsletterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: true
})
export class AppComponent {
  title = 'your-app-name';
}
