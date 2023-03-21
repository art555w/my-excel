import {Directive, HostListener, Renderer2} from '@angular/core';

import {SelectCellService} from "../select-cell/select-cell.service";
import {ResizeTableDirective} from "../resize-table/resize-table.directive";
import {SelectCellDirective} from "../select-cell/select-cell.directive";

@Directive({
  selector: '[appMousedownTable]'
})
export class MousedownTableDirective {

  currentId = ''
  lastId = ''
  isGrabbing = false
  private unMousemove: any
  private unSubMouseup: any

  constructor(
    private renderer: Renderer2,
    private selectCellService: SelectCellService,
    private resizeTableDirective: ResizeTableDirective,
    private selectCellDirective: SelectCellDirective
  ) {
  }

  @HostListener('mousedown', ['$event', '$event.target'])
  onMousedown(event: MouseEvent, el: any) {
    this.resizeTableDirective.resizeTable(event, el)
    if (el.getAttribute('data-type') === 'cell') {
      if (!event.shiftKey) {
        this.currentId = el.id
        this.selectCellService.selectCell(this.currentId)
      } else {
        this.lastId = el.id
        this.isGrabbing = true
        this.selectCellService.selectGroup(this.lastId)
      }

      this.unMousemove = this.renderer.listen('document', 'mousemove', event => {
        if (this.lastId !== event.target.id) {
          event.preventDefault()
          this.isGrabbing = true
          this.lastId = event.target.dataset.type === 'cell'
            ? event.target.id
            : this.lastId
          this.selectCellService.selectGroup(this.lastId)
        }
      })
      this.unSubMouseup = this.renderer.listen('document', 'mouseup', (event) => {
        this.unMousemove()
        if (this.isGrabbing) {
          this.selectCellDirective.addBorder('1px')
          this.isGrabbing = false
          this.unSubMouseup()
        }
      })
    }
  }
}
