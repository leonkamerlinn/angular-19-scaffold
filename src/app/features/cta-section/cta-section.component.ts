import { Component } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-cta-section',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './cta-section.component.html',
})
export class CtaSectionComponent {
  title = 'Boost your productivity. Start using our app today.';
  description = 'Ac euismod vel sit maecenas id pellentesque eu sed consectetur. Malesuada adipiscing sagittis vel nulla.';
  imageUrl = 'https://tailwindui.com/plus-assets/img/component-images/dark-project-app-screenshot.png';
}
