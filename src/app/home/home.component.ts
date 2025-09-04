import { Component, signal, computed, inject, effect } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { TranslocoService, TranslocoModule } from '@jsverse/transloco';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { HeroSectionComponent } from '../features/hero-section/hero-section.component';
import { CtaSectionComponent } from '../features/cta-section/cta-section.component';
import { NewsletterComponent } from '../features/newsletter/newsletter.component';
import { WorkWithUsComponent } from '../features/work-with-us/work-with-us.component';
import { StoreNavigationComponent } from '../features/store-navigation/store-navigation.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    TranslocoModule,
    MatFormFieldModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    HeroSectionComponent,
    CtaSectionComponent,
    NewsletterComponent,
    WorkWithUsComponent,
    StoreNavigationComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  private translocoService = inject(TranslocoService);
  
  appName = signal('MyApp');
  availableLanguages = signal(['en', 'es', 'fr']);
  
  // Use computed signals for derived state
  currentLanguage = computed(() => this.translocoService.getActiveLang());
  
  constructor() {
    // Use effect for side effects
    effect(() => {
      console.log('Current language:', this.currentLanguage());
    });
  }

  onLanguageChange(lang: string): void {
    this.translocoService.setActiveLang(lang);
  }
}
