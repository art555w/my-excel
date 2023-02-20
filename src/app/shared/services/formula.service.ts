import {EventEmitter, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormulaService {

  formText: EventEmitter<string> = new EventEmitter<string>()
  cellText: EventEmitter<string> = new EventEmitter<string>()

  constructor() { }

  formulaInput(text: string) {
    this.formText.emit(text)
  }

  cellInput(text: string) {
    this.cellText.emit(text)
  }

}
