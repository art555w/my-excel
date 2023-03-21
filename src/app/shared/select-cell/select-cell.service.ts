import {ElementRef, Injectable} from '@angular/core';
import {Subject} from "rxjs";
import {Store} from "@ngrx/store";

import {SelectUtilsService} from "./select-utils.service";
import {AllCellService} from "../services/all-cell.service";
import {IBorder} from "../interface";
import {textCell} from "../../store/actions/excel.actions";

@Injectable({
  providedIn: 'root'
})
export class SelectCellService {
  currentCell!: ElementRef
  currentId = ''
  lastId = ''
  groupCells: ElementRef[] = []
  groupId: string[] = []
  currentText = ''
  prevText = ''
  startPos = ''


  selectedPos$: Subject<string> = new Subject<string>()
  selectCell$: Subject<ElementRef> = new Subject<ElementRef>()
  selectGroup$: Subject<ElementRef[]> = new Subject<ElementRef[]>()
  selectUnited$: Subject<IBorder> = new Subject<IBorder>()

  constructor(
    private selectUtilsService: SelectUtilsService,
    private allCellService: AllCellService,
    private store: Store,
  ) {
  }

  selectCell(id: string | void): void {
    if (!id) {
      this.selectCell$.next(this.currentCell)
      return
    }
    this.clear()
    this.currentId = id
    this.groupId.push(id)
    this.currentText = this.currentCell.nativeElement.textContent
    this.currentCell = this.allCellService.getCellById(id) ?
      this.allCellService.getCellById(id)
      : this.currentCell
    this.startPos = this.selectedPos(this.currentCell.nativeElement.dataset)
    this.selectedPos$.next(this.startPos)
    if (this.prevText.trim() !== this.currentText.trim()) {
      this.store.dispatch(textCell({
        data: {
          [this.lastId]: this.currentText.trim()
        }
      }))
    }
    this.lastId = id
    this.prevText = this.currentCell.nativeElement.textContent
    this.groupCells.push(this.currentCell)
    this.selectCell$.next(this.currentCell)
  }

  selectGroup(lastId: string): void {
    this.clear()
    this.lastId = lastId
    this.groupId = this.selectUtilsService.getAllIdSelectedCells(this.currentId, lastId)
    this.groupCells = this.allCellService.getGroupCells(this.groupId)
    this.selectGroup$.next(this.groupCells)
    const lastPos = this.selectedPos(this.allCellService.getCellById(lastId).nativeElement.dataset)
    if (this.startPos === lastPos) {
      this.selectedPos$.next(this.startPos)
      return
    }
    this.selectedPos$.next(`${this.startPos}:${lastPos}`)
  }

  selectBorder(): IBorder {
    return this.selectUtilsService.getBorder(this.groupId)
  }

  selectedPos(data: { [key: string]: any }): string {
    const {col, row} = data
    return `${col}${row}`
  }

  clear() {
    this.groupId = []
    this.groupCells = []
  }
}
