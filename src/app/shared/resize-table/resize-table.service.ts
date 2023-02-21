import {Injectable} from '@angular/core';
import {IEvent, IResizeResponse} from "../interface";
import {AllCellService} from "../services/all-cell.service";

@Injectable({
  providedIn: 'root'
})
export class ResizeTableService {
  constructor(private allCellService: AllCellService) {
  }

  resizeCol(id: string, startGrabbing: number, event: MouseEvent, elWidth: number): IResizeResponse {
    const value = event.x - startGrabbing + elWidth < 40
      ? 40
      : event.x - startGrabbing + elWidth
    const els = this.allCellService.getCols(id)
    return {
      value,
      els
    }
  }

  resizeRow(id: string, startGrabbing: number, event: MouseEvent, elHeight: number): IResizeResponse {
    const value = event.y - startGrabbing + elHeight < 20
      ? 20
      : event.y - startGrabbing + elHeight
    const els = this.allCellService.getRows(id)
    return {
      value,
      els
    }
  }

  posCursor(type: string, event: MouseEvent, coordsX: number): number {
    if (type === 'col') {
      const value = event.x - coordsX < 40 ? 40 : event.x - coordsX
      return value
    }
    return event.y - coordsX < 20
      ? 20
      : event.y - coordsX
  }
}
