import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getCharCode'
})
export class GetCharCodePipe implements PipeTransform {

  transform(value: number): unknown {
    return String.fromCharCode(value)
  }

}
