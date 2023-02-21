import {Directive, HostListener, Renderer2} from '@angular/core';
import {SelectCellService} from "../select-cell/select-cell.service";

@Directive({
  selector: '[appMousedownTable]'
})
export class MousedownTableDirective {

  private unMousemove: any
  private unSubMouseup: any
  currentId = ''
  lastId = ''
  isGrabbing = false

  constructor(
    private renderer: Renderer2,
    private selectCellService: SelectCellService,
  ) { }

  @HostListener('mousedown', ['$event', '$event.target'])
  onMousedown(event: MouseEvent, el: Element) {
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
          this.isGrabbing = true
          this.lastId = event.target.dataset.type === 'cell'
            ? event.target.id
            : this.lastId
          this.selectCellService.selectGroup(this.lastId)
        }
      })
      this.unSubMouseup = this.renderer.listen('document', 'mouseup', () => {
        this.unMousemove()
        if (this.isGrabbing) {
          this.isGrabbing = false
          this.unSubMouseup()
        }
      })
    }
  }
}
