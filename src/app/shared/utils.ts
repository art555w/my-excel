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
    'b-top': [],
    'b-right': [],
    'b-left': [],
    'b-bottom': [],
  }
  const top = getId(idSelCell[0]).row
  const left = getId(idSelCell[0]).col
  const right = getId(idSelCell[idSelCell.length - 1]).col
  const bottom = getId(idSelCell[idSelCell.length - 1]).row

  idSelCell.forEach((cell) => {
    if (getId(cell).row === top) res["b-top"].push(cell)

    if (getId(cell).col === left) res["b-left"].push(cell)

    if (getId(cell).col === right)  res["b-right"].push(cell)

    if (getId(cell).row === bottom) res["b-bottom"].push(cell)
  })
  return res
}

export function getId(id: string): IId {
  return {
    col: +id.split(':')[0],
    row: +id.split(':')[1],
  }
}



