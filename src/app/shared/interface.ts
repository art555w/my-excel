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
