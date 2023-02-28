import {ElementRef, Injectable} from '@angular/core';
import {SelectUtilsService} from "./select-utils.service";
import {AllCellService} from "../services/all-cell.service";
import {IBorder} from "../interface";
import {Subject} from "rxjs";
import {Store} from "@ngrx/store";
import {textCell} from "../../store/actions/excel.actions";
import {TableService} from "../services/table.service";

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


  selectCell$: Subject<ElementRef> = new Subject<ElementRef>()
  selectGroup$: Subject<ElementRef[]> = new Subject<ElementRef[]>()

  constructor(
    private selectUtilsService: SelectUtilsService,
    private allCellService: AllCellService,
    private store: Store,
    private tableService: TableService
  ) {
  }

  selectCell(id: string | void): void {
    if (!id) {
      this.selectCell$.next(this.currentCell)
      return
    }
    this.clear()
    this.currentId = id
    this.currentText = this.currentCell.nativeElement.textContent
    this.currentCell = this.allCellService.getCellById(id) ?
      this.allCellService.getCellById(id)
      : this.currentCell
    this.tableService.selectedPos(this.currentCell.nativeElement.dataset)
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
    this.currentText = this.currentCell.nativeElement.textContent

    if (this.prevText.trim() !== this.currentText.trim()) {
      this.store.dispatch(textCell({
        data: {
          [this.currentId]: this.currentText.trim()
        }
      }))
    }
    this.prevText = this.currentText
    this.currentText = this.allCellService.getCellById(lastId).nativeElement.textContent
    this.groupId = this.selectUtilsService.getAllIdSelectedCells(this.currentId, lastId)
    this.groupCells = this.allCellService.getGroupCells(this.groupId)
    this.selectGroup$.next(this.groupCells)
  }

  selectBorder(): IBorder {
    return this.selectUtilsService.getBorder(this.groupId)
  }

  clear() {
    this.groupCells = []
  }
}
