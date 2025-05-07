import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'humanReadableNumber',
  standalone: true,
})
export class HumanReadableNumberPipe implements PipeTransform {
  transform(input: number, precision: number = 1): string | null {
    const suffixes = ['K', 'M', 'B', 'T'];

    if (Number.isNaN(input) || !Number.isFinite(input)) {
      return null; // Handle NaN and Infinity
    }

    if (input === 0) {
      return '0';
    }

    const isNegative = input < 0;
    const absInput = Math.abs(input);

    if (absInput < 1000) {
      // For numbers like 0.5, 10.23 etc.
      // Return the number as a string without suffix formatting, consistent with prior behavior.
      return String(input);
    }

    // Determine the exponent for suffix calculation
    // exp = 1 for thousands (10^3), 2 for millions (10^6), etc.
    const exp = Math.floor(Math.log(absInput) / Math.log(1000));

    // Fallback for safety, though absInput >= 1000 should mean exp >= 1
    if (exp < 1) {
        return input.toFixed(precision);
    }
    
    // Cap exponent to the number of available suffixes
    const actualExp = Math.min(exp, suffixes.length);

    const valueForFormatting = absInput / Math.pow(1000, actualExp);
    
    let formattedNumber = valueForFormatting.toFixed(precision);

    return (isNegative ? '-' : '') + formattedNumber + suffixes[actualExp - 1];
  }
} 