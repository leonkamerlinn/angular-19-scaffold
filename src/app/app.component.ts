import { Component } from '@angular/core';
import { WorkWithUsComponent } from './features/work-with-us/work-with-us.component';
import { NewsletterComponent } from './features/newsletter/newsletter.component';
import { CtaSectionComponent } from './features/cta-section/cta-section.component';
import { HeroSectionComponent } from './features/hero-section/hero-section.component';

@Component({
  selector: 'app-root',
  imports: [
    WorkWithUsComponent, 
    NewsletterComponent, 
    CtaSectionComponent,
    HeroSectionComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: true
})
export class AppComponent {
  title = 'your-app-name';
}
