import {Injectable} from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TableService {

  tableInput$: Subject<string> = new Subject<string>()

  constructor() {
  }

  tableInput(text: string) {
    this.tableInput$.next(text)
  }
}
