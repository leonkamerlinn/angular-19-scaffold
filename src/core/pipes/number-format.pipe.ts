import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberFormat',
  standalone: true,
})
export class NumberFormatPipe implements PipeTransform {
  transform(value: number): string {
    if (value < 1_000) {
      return value.toString(); // No formatting needed
    } else if (value < 1_000_000) {
      return (value / 1_000).toFixed(1) + 'K'; // Thousands
    } else if (value < 1_000_000_000) {
      return (value / 1_000_000).toFixed(1) + 'M'; // Millions
    } else if (value < 1_000_000_000_000) {
      return (value / 1_000_000_000).toFixed(1) + 'B'; // Billions
    } else {
      return (value / 1_000_000_000_000).toFixed(1) + 'T'; // Trillions and above
    }
  }
}
