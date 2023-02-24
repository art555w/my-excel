import {ElementRef, Injectable} from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AllCellService {

  cells: ElementRef[] = []

  Cells$: Subject<ElementRef[]> = new Subject<ElementRef[]>()

  constructor() {
  }

  buildCells(elRef: ElementRef) {
    this.cells.push(elRef)

  }

  getCells(): ElementRef[] {
    return this.cells
  }

  getCols(id: string): ElementRef[] {
    return this.cells.filter(cell => cell.nativeElement.dataset.col === id)
  }

  getRows(id: string): ElementRef[] {
    return this.cells.filter(cell => cell.nativeElement.dataset.row === id)
  }

  getCellById(id: string): ElementRef {
    return this.cells.filter((cell) => cell.nativeElement.id === id)[0]
  }

  getGroupCells(ids: string[]): ElementRef[] {
    return ids.reduce((acc: any, id) => {
      this.cells.forEach(cell => {
        if (cell.nativeElement.id === id) {
          acc.push(cell)
        }
      })
      return acc
    }, [])
  }
}
