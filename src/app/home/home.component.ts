import { Component, signal, WritableSignal, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { TranslocoService, TranslocoModule } from '@jsverse/transloco';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    TranslocoModule,
    MatFormFieldModule,
    MatSelectModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  appName = signal('MyApp');
  private translocoService = inject(TranslocoService);

  availableLangs: WritableSignal<{ id: string; label: string }[]> = signal([
    { id: 'en', label: 'English' },
    { id: 'es', label: 'Español' },
    { id: 'fr', label: 'Français' }
  ]);
  activeLang: WritableSignal<string> = signal(this.translocoService.getActiveLang());

  constructor() {
    this.translocoService.langChanges$.subscribe(lang => {
      this.activeLang.set(lang);
    });
  }

  changeLanguage(lang: string): void {
    this.translocoService.setActiveLang(lang);
  }
}
