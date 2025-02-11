import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-loading-wrapper',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatProgressSpinner, JsonPipe],
  templateUrl: './loading-wrapper.component.html',
  styleUrl: './loading-wrapper.component.css',
})
export class LoadingWrapperComponent {
  loading = input<boolean>(true);
  error = input<Error | null>(null);
}
