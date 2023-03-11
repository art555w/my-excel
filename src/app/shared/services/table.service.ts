import {Injectable} from '@angular/core';
import {Subject} from "rxjs";
import {ToolbarService} from "./toolbar.service";
import {IDefaultStyle} from "../interface";

@Injectable({
  providedIn: 'root'
})
export class TableService {

  styles: IDefaultStyle = {}

  tableInput$: Subject<string> = new Subject<string>()
  selectedPos$: Subject<string> = new Subject<string>()

  constructor(private toolbarService: ToolbarService) {
  }

  tableInput(text: string) {
    this.tableInput$.next(text)
  }

  selectedPos(data: { [key: string]: any }) {
    const {col, row} = data
    this.selectedPos$.next(`${col}${row}`)
  }

  applyStyle(style: IDefaultStyle) {
    this.styles = {...this.styles, ...style}
    this.toolbarService.setIcons(this.styles)
  }
}
