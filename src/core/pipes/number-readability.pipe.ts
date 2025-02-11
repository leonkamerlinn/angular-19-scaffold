import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberReadability',
  standalone: true,
})
export class NumberReadabilityPipe implements PipeTransform {
  transform(input: number, args?: number): string | null {
    const suffixes = ['k', 'M', 'B', 'T'];

    if (Number.isNaN(input)) {
      return null;
    }

    if (input < 1000) {
      return String(input);
    }

    const exp = Math.floor(Math.log(input) / Math.log(1000));

    return (input / Math.pow(1000, exp)).toFixed(args) + suffixes[exp - 1];
  }
}
