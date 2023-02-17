import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AllCellService {

  cells: Array<Element> = []
  constructor() { }

  buildCells(cell: any) {
    this.cells.push(cell)
  }

  getAllCell() {
    return this.cells
  }

  getCols(id: string): Element[] {
    return this.cells.filter((cell) => cell.getAttribute('data-col') === id)
  }

  getCellById(id: string): Element {
    return this.cells.filter((cell) => cell.id === id)[0]
  }

  getGroupCells(ids: string[]): Element[] {
    return ids.reduce((acc: any, id) => {
      this.cells.forEach(cell => {
        if (cell.id === id) {
          acc.push(cell)
        }
      })
      return acc
    }, [])
  }
}
