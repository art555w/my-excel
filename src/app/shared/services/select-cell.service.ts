import {Injectable} from '@angular/core';
import {AllCellService} from "./all-cell.service";

@Injectable({
  providedIn: 'root'
})
export class SelectCellService {

  current!: Element
  selectedGroup: Element[] = []
  groupId: string[] = []

  constructor(private allCellService: AllCellService) {
  }


  selectCell(id: string): Element {
    this.clear()
    this.groupId.push(id)
    this.current = this.allCellService.getCellById(id)
    this.selectedGroup.push(this.current)
    return this.current
  }

  selectGroup(ids: string[] | null): Element[] {
    if (!ids) {
      return this.selectedGroup
    }
    this.clear()
    this.groupId = ids
    this.selectedGroup = this.allCellService.getGroupCells(ids)
    return this.selectedGroup
  }

  clear() {
    this.selectedGroup = []
  }
}
