import {ElementRef, Injectable} from '@angular/core';
import {AllCellService} from "./all-cell.service";

@Injectable({
  providedIn: 'root'
})
export class SelectCellService {

  current!: ElementRef
  selectedGroup: ElementRef[] = []

  constructor(private allCellService: AllCellService) {
  }


  selectCell(id: string): ElementRef {
    this.clear()
    this.current = this.allCellService.getCellById(id)
    this.selectedGroup.push(this.current)
    return this.current
  }

  selectGroup(ids: string[] | null): ElementRef[] {
    if (!ids) {
      return this.selectedGroup
    }
    this.clear()
    this.selectedGroup = this.allCellService.getGroupCells(ids)
    return this.selectedGroup
  }

  clear() {
    this.selectedGroup = []
  }
}
