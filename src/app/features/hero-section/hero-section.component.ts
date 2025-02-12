import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './hero-section.component.html'
})
export class HeroSectionComponent {
  title = 'Data to enrich your online business';
  description = 'Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat.';
  announcement = {
    text: 'Announcing our next round of funding.',
    linkText: 'Read more',
    href: '#'
  };

  clipPath = "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)";
} 