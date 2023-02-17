import {Injectable} from '@angular/core';
import {AllCellService} from "./all-cell.service";

@Injectable({
  providedIn: 'root'
})
export class SelectCellService {

  current = ''
  selectedGroup: string[] = []

  constructor(private allCellService: AllCellService) {
  }


  selectCell(id: string): Element {
    this.clear()
    this.current = id
    this.selectedGroup.push(this.current)
    return this.allCellService.getCellById(this.current)
  }

  selectGroup(ids: string[] | null): Element[] {
    if (!ids) {
      return this.allCellService.getGroupCells(this.selectedGroup)
    }
    this.clear()
    this.selectedGroup = ids
    return this.allCellService.getGroupCells(this.selectedGroup)
  }

  clear() {
    this.selectedGroup = []
  }
}
