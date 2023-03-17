import {Injectable} from '@angular/core';
import {SelectUtilsService} from "../select-cell/select-utils.service";
import {SelectCellService} from "../select-cell/select-cell.service";

@Injectable({
  providedIn: 'root'
})
export class UnitService {
  next = ''
  united = true

  constructor(private selectUtils: SelectUtilsService, private selectCellService: SelectCellService) {
  }

  nextCell(key: string, startId: string, finishId: string): void {
    switch (key) {
      case 'ArrowDown':
      case 'ArrowRight':
      case 'Tab':
      case 'Enter':
        this.next = this.selectUtils.nextCell(key, finishId)
        break
      case 'ArrowLeft':
      case 'ArrowUp':
        this.next = this.selectUtils.nextCell(key, startId)
        break
    }
    this.selectCellService.selectCell(this.next)
  }

  handleUnit(start: string, finish: string) {
    this.selectCellService.selectCell(start)
    this.selectCellService.selectGroup(finish)
    this.selectCellService.selectUnited()
  }

}
