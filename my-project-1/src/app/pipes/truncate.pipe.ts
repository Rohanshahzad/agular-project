import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {
  transform(value: string, letters: number): string {
    if (!value) return '';
    const lettersArray = value.split('');
    return lettersArray.slice(0, letters).join('');
  }
}
