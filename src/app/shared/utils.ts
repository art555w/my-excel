import {IBorder, IId} from "./interface";

export function getByRange(start: number, finish: number): number[] {
  const res = []

  if (start > finish) {
    [start, finish] = [finish, start]
  }

  for (let i = start; i <= finish; i++) {
    res.push(i)
  }

  return res
}

export function getBorder(idSelCell: string[]): IBorder {
  const res: IBorder = {
    'border-top': [],
    'border-right': [],
    'border-left': [],
    'border-bottom': [],
  }
  const top = getId(idSelCell[0]).row
  const left = getId(idSelCell[0]).col
  const right = getId(idSelCell[idSelCell.length - 1]).col
  const bottom = getId(idSelCell[idSelCell.length - 1]).row

  idSelCell.forEach((cell) => {
    if (getId(cell).row === top) res["border-top"].push(cell)

    if (getId(cell).col === left) res["border-left"].push(cell)

    if (getId(cell).col === right)  res["border-right"].push(cell)

    if (getId(cell).row === bottom) res["border-bottom"].push(cell)
  })
  return res
}

export function getId(id: string): IId {
  return {
    col: +id.split(':')[0],
    row: +id.split(':')[1],
  }
}



