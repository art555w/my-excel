import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'getFromCharCode'
})
export class GetFromCharCodePipe implements PipeTransform {

  transform(value: number): string {
    return String.fromCharCode(value)
  }

}
