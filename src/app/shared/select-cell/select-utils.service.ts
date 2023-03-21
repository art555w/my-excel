import {Injectable} from '@angular/core';

import {IBorder, IId} from "../interface";
import {TableTemplateService} from "../services/table-template.service";

@Injectable({
  providedIn: 'root'
})
export class SelectUtilsService {

  constructor(private tableTemplateService: TableTemplateService) {
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

  nextCell(key: string, id: string): string {
    let {col} = this.getId(id)
    let {row} = this.getId(id)
    const amountCols = this.tableTemplateService.amountCols
    const amountRows = this.tableTemplateService.amountRows
    const MIN_VALUE = 1

    switch (key) {
      case 'ArrowRight':
      case 'Tab':
        col = col === amountCols ? amountCols : col + 1
        break
      case 'ArrowDown':
      case 'Enter':
        row = row === amountRows ? amountRows : row + 1
        break
      case 'ArrowLeft':
        col = col === MIN_VALUE ? MIN_VALUE : col - 1
        break
      case 'ArrowUp':
        row = row === MIN_VALUE ? MIN_VALUE : row - 1
        break
    }
    return `${col}:${row}`
  }
}
