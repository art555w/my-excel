import {ElementRef} from "@angular/core";

export interface IResizeResponse {
  value: number,
  els?: ElementRef[]
}

export interface IEvent {
  x?: number,
  y?: number
}

export interface IBorder {
  'b-top': string[],
  'b-right': string[],
  'b-left': string[],
  'b-bottom': string[],
}

export interface IId {
  col: number,
  row: number
}

export interface ICoords {
  bottom: number
  height: number
  left: number
  right: number
  top: number
  width: number
  x: number
  y: number
}

export interface IResizeTable {
  size: number,
  els: ElementRef[],
  type: string
}

export interface IDefaultStyle {
  width: string,
  height: string
}

export interface IStoreData {
  [key: string]: any
}
