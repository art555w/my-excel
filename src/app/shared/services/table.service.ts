import {Injectable} from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TableService {

  tableInput$: Subject<string> = new Subject<string>()
  selectedPos$: Subject<string> = new Subject<string>()

  constructor() {
  }

  tableInput(text: string) {
    this.tableInput$.next(text)
  }

  selectedPos(data: { [key: string]: any }) {
    const {col, row} = data
    this.selectedPos$.next(`${col}${row}`)
  }
}
