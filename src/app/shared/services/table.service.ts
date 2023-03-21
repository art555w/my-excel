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

  constructor(private toolbarService: ToolbarService) {
  }

  tableInput(text: string) {
    this.tableInput$.next(text)
  }

  applyStyle(style: IDefaultStyle) {
    this.styles = {...this.styles, ...style}
    this.toolbarService.setIcons(this.styles)
  }
}
