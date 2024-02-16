import { Pipe, PipeTransform } from '@angular/core';
import { MessageFeedback } from "../enums/message-feeback.enum";

@Pipe({
  name: 'isLike',
  standalone: true
})
export class IsLikePipe implements PipeTransform {

  transform(value: string, index: number, feedback: string, messageType: MessageFeedback): boolean {
    return  value === 'a' + index && feedback === messageType;
  }

}
