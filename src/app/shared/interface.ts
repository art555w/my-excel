export interface ICoords {
  top: number
  left: number,
  bottom: number,
  right: number,
  x: number,
  y: number,
  width: number,
  height: number
}

export interface ICellState {
  size: [ISizeState]
}

export interface ISizeState {
  id: string
  width?: number,
  height?: number
}

export interface IId {
  col: number,
  row: number
}

export interface IBorder {
  'border-top': string[],
  'border-right': string[],
  'border-left': string[],
  'border-bottom': string[],
}
