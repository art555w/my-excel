import {ElementRef, Injectable} from '@angular/core';
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AllCellService{
  cells: Array<ElementRef> = []

  constructor() {
  }


  buildCells(cell: any) {
    this.cells.push(cell)
  }

  getAllCell() {
    return this.cells
  }

  getCols(id: string): ElementRef[] {
    return this.cells.filter((cell) => cell.nativeElement.getAttribute('data-col') === id)
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
