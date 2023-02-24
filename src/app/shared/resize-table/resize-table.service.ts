import {Injectable} from '@angular/core';
import {IResizeResponse} from "../interface";
import {AllCellService} from "../services/all-cell.service";
import {Store} from "@ngrx/store";
import {colState} from "../../store/actions/excel.actions";
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ResizeTableService {

  constructor(private allCellService: AllCellService, private store: Store) {
  }


  resizeCol(id: string, startGrabbing: number, event: MouseEvent, elWidth: number): Observable<IResizeResponse> {
    const value = event.x - startGrabbing + elWidth < 40
      ? 40
      : event.x - startGrabbing + elWidth
    const els = this.allCellService.getCols(id)
    this.store.dispatch(colState({
      data: {[id]: value}
    }))
    return of({
      value,
      els
    })
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
