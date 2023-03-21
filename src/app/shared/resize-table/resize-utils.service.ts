import {Injectable} from '@angular/core';

import {ICoords} from "../interface";

@Injectable({
  providedIn: 'root'
})
export class ResizeUtilsService {

  constructor() {
  }

  getSize(type: string, startGrabbing: number, event: MouseEvent, coords: ICoords): number {
    if (type === 'col') {
      return event.x - startGrabbing + coords.width < 40
        ? 40
        : event.x - startGrabbing + coords.width
    } else if (type == 'row') {
      return event.y - startGrabbing + coords.height < 20
        ? 20
        : event.y - startGrabbing + coords.height
    }
    return 0
  }

  getPosCursor(type: string, event: MouseEvent, coords: ICoords): number {
    if (type === 'col') {
      return event.x - coords.x < 40
        ? 40
        : event.x - coords.x
    } else if (type === 'row') {
      return event.y - coords.y < 20
        ? 20
        : event.y - coords.y
    }
    return 0
  }
}
