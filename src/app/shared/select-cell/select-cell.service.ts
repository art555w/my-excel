import {ElementRef, Injectable} from '@angular/core';
import {SelectUtilsService} from "./select-utils.service";
import {AllCellService} from "../services/all-cell.service";
import {IBorder} from "../interface";

@Injectable({
  providedIn: 'root'
})
export class SelectCellService {

  currentCell!: ElementRef
  currentId = ''
  selectedGroup: ElementRef[] = []
  groupId: string[] = []
  constructor(private selectUtilsService: SelectUtilsService, private allCellService: AllCellService) { }

  selectCell(id: string): ElementRef {
    this.clear()
    this.currentId = id
    this.currentCell = this.allCellService.getCellById(id)
    this.selectedGroup.push(this.currentCell)
    return this.currentCell
  }
  selectGroup(lastId: string | null): ElementRef[] {
    if (!lastId) {
      return this.selectedGroup
    }
    this.clear()
    this.groupId = this.selectUtilsService.getAllIdSelectedCells(this.currentId, lastId)
    this.selectedGroup = this.allCellService.getGroupCells(this.groupId)
    return this.selectedGroup
  }
  selectBorder(): IBorder{
    return this.selectUtilsService.getBorder(this.groupId)
  }
  clear() {
    this.selectedGroup = []
  }

}
