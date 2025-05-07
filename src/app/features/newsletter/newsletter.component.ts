import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { CALENDAR_DAYS_ICON_PATH } from '@app-core/icons/calendar-days-icon';
import { HAND_THUMB_UP_ICON_PATH } from '@app-core/icons/hand-thumb-up-icon';

interface NewsletterFeature {
  icon: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-newsletter',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule
  ],
  templateUrl: './newsletter.component.html'
})
export class NewsletterComponent {
  features: NewsletterFeature[] = [
    {
      icon: CALENDAR_DAYS_ICON_PATH,
      title: 'Weekly articles',
      description: 'Non laboris consequat cupidatat laborum magna. Eiusmod non irure cupidatat duis commodo amet.'
    },
    {
      icon: HAND_THUMB_UP_ICON_PATH,
      title: 'No spam',
      description: 'Officia excepteur ullamco ut sint duis proident non adipisicing. Voluptate incididunt anim.'
    }
  ];
}
