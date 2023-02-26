import {Directive, HostListener} from '@angular/core';
import {SelectCellService} from "../select-cell/select-cell.service";
import {SelectUtilsService} from "../select-cell/select-utils.service";

@Directive({
  selector: '[appKeydownTable]'
})
export class KeydownTableDirective {


  nextId = ''
  lastId = ''

  constructor(
    private selectCellService: SelectCellService,
    private selectUtils: SelectUtilsService
  ) {
  }

  @HostListener('keydown', ['$event', '$event.target'])
  onMousedown(event: KeyboardEvent, el: Element) {
    if (el.getAttribute('data-type') === 'cell') {
      const keys = ['ArrowDown', 'ArrowRight', 'ArrowLeft', 'ArrowUp', 'Tab', 'Enter']
      const {key} = event
      this.nextId = el.id
      if (keys.includes(key)) {
        if (!event.shiftKey) {
          event.preventDefault()
          this.nextId = this.selectUtils.nextCell(key, this.nextId)
          this.selectCellService.selectCell(this.nextId)
        } else {
          this.lastId = this.selectCellService.lastId
          this.lastId = this.selectUtils.nextCell(key, this.lastId)
          this.selectCellService.selectGroup(this.lastId)
        }
      }
    }
  }
}
