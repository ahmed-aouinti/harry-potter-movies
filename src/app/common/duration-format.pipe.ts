import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'durationFormat',
  standalone: true,
})
export class DurationFormatPipe implements PipeTransform {
  transform(duration: number): string {
    if (isNaN(duration) || duration < 0) {
      return 'Invalid Duration';
    }

    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;

    return `${hours ? hours + 'h ' : ''}${minutes ? minutes + 'min' : ''}`;
  }
}
