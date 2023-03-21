import {Directive, ElementRef, HostListener, Renderer2} from '@angular/core';

import {SelectCellService} from "../select-cell/select-cell.service";
import {SelectUtilsService} from "../select-cell/select-utils.service";
import {TableService} from "../services/table.service";

@Directive({
  selector: '[appKeydownTable]'
})
export class KeydownTableDirective {
  nextId = ''
  lastId = ''
  currentCell!: ElementRef
  text = ''

  constructor(
    private selectCellService: SelectCellService,
    private selectUtils: SelectUtilsService,
    private renderer: Renderer2,
    private tableService: TableService,
  ) {
  }

  @HostListener('keydown', ['$event', '$event.target'])
  onKeydown(event: KeyboardEvent, el: Element) {
    if (el.getAttribute('data-type') === 'cell') {
      const keys = ['ArrowDown', 'ArrowRight', 'ArrowLeft', 'ArrowUp', 'Tab', 'Enter']
      const {key} = event
      this.nextId = el.id
      this.currentCell = this.selectCellService.currentCell
      if (keys.includes(key)) {
        if (!event.shiftKey) {
          event.preventDefault()
          this.nextId = this.selectUtils.nextCell(key, this.nextId)
          this.selectCellService.selectCell(this.nextId)
        } else {
          event.preventDefault()
          this.lastId = this.selectCellService.lastId
          this.lastId = this.selectUtils.nextCell(key, this.lastId)
          this.selectCellService.selectGroup(this.lastId)
        }
      } else {
        const subKeyup = this.renderer.listen(this.currentCell.nativeElement, 'keyup', (event) => {
          this.selectCellService.selectCell()
          this.text = this.currentCell.nativeElement.textContent
          this.tableService.tableInput(this.text)
          subKeyup()
        })
      }
    }
  }
}
