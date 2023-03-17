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

export interface IStoreData {
  [key: string]: any
}

export interface IDefaultStyle {
  width?: string,
  height?: string,
  'font-weight'?: string,
  'font-style'?: string,
  'text-decoration'?: string,
  'text-align'?: string,
  color?: string,
  'background-color'?: string,
  'border-right'?: string
  'border-bottom'?: string,
  'border-top'?: string,
  'border-left'?: string
}

export interface IIcons {
  name: string
  active: boolean,
  style: {},
  type?: string,
  disable?: boolean
}

export interface IUser {
  email: string,
  password: string,
  returnSecureToken?: boolean
}

export interface IFbAuthResponse {
  expiresIn: string,
  idToken: string,
  localId: string
}

export interface IFbCreateResponse {
  name: string
}

