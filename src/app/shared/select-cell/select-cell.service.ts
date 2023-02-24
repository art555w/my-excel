import {ElementRef, Injectable} from '@angular/core';
import {SelectUtilsService} from "./select-utils.service";
import {AllCellService} from "../services/all-cell.service";
import {IBorder} from "../interface";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SelectCellService {
  currentCell!: ElementRef
  currentId = ''
  lastId = ''
  groupCells: ElementRef[] = []
  groupId: string[] = []

  selectCell$: Subject<ElementRef> = new Subject<ElementRef>()
  selectGroup$: Subject<ElementRef[]> = new Subject<ElementRef[]>()

  constructor(private selectUtilsService: SelectUtilsService, private allCellService: AllCellService) {
  }

  selectCell(id: string): void {
    this.clear()
    this.currentId = id
    this.lastId = id
    this.currentCell = this.allCellService.getCellById(id)
    this.groupCells.push(this.currentCell)
    this.selectCell$.next(this.currentCell)
  }

  selectGroup(lastId: string): void {
    this.clear()
    this.lastId = lastId
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
