import {Injectable} from '@angular/core';
import {IBorder, IId} from "../interface";

@Injectable({
  providedIn: 'root'
})
export class SelectUtilsService {

  constructor() {
  }

  getAllIdSelectedCells(currentId: string, lastId: string): string[] {
    const cols = this.getByRange(this.getId(lastId).col, this.getId(currentId).col)
    const rows = this.getByRange(this.getId(lastId).row, this.getId(currentId).row)

    const ids = rows.reduce((acc: string[], row) => {
      cols.forEach(col => {
        acc.push(`${col}:${row}`)
      })
      return acc
    }, [])

    return ids
  }

  getByRange(start: number, finish: number): number[] {
    const res = []
    if (start > finish) {
      [start, finish] = [finish, start]
    }
    for (let i = start; i <= finish; i++) {
      res.push(i)
    }
    return res
  }

  getBorder(idSelCell: string[]): IBorder {
    const res: IBorder = {
      'b-top': [],
      'b-right': [],
      'b-left': [],
      'b-bottom': [],
    }
    const top = this.getId(idSelCell[0]).row
    const left = this.getId(idSelCell[0]).col
    const right = this.getId(idSelCell[idSelCell.length - 1]).col
    const bottom = this.getId(idSelCell[idSelCell.length - 1]).row

    idSelCell.forEach((cell) => {
      if (this.getId(cell).row === top) res["b-top"].push(cell)
      if (this.getId(cell).col === left) res["b-left"].push(cell)
      if (this.getId(cell).col === right) res["b-right"].push(cell)
      if (this.getId(cell).row === bottom) res["b-bottom"].push(cell)
    })
    return res
  }

  getId(id: string): IId {
    return {
      col: +id.split(':')[0],
      row: +id.split(':')[1],
    }
  }
}
