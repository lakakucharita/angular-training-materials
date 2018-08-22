import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'friendlyAnswerCount'
})
export class FriendlyAnswerCountPipe implements PipeTransform {

  transform(value: number, args?: any): string {
    if (value == 0) {
      return 'Unanswered'
    } else if (value == 1) {
      return 'Not so popular'
    } else if (value > 1) {
      return 'Trending';
    }
    
    return null;
  }

}
