import {Injectable} from '@angular/core';
import {AllCellService} from "../services/all-cell.service";
import {Subject} from "rxjs";
import {IResizeTable} from "../interface";

@Injectable({
  providedIn: 'root'
})
export class ResizeTableService {

  elsRef$: Subject<IResizeTable> = new Subject<IResizeTable>()

  constructor(private allCellService: AllCellService) {
  }

  resizeTable(type: string, id: string, size: number): void {
    const els = type === 'col'
      ? this.allCellService.getCols(id)
      : this.allCellService.getRows(id)
    this.elsRef$.next({
      size,
      els,
      type
    })
  }

}
