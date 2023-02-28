import {ElementRef, Injectable} from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AllCellService {

  cells: ElementRef[] = []
  cellsGroup$: Subject<ElementRef[]> = new Subject<ElementRef[]>()

  constructor() {
  }

  buildCells(elRef: ElementRef) {
    this.cells.push(elRef)
    this.cellsGroup$.next(this.cells)
  }

  getCells(): ElementRef[] {
    return this.cells
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
