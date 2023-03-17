import {Directive, HostListener, Renderer2} from '@angular/core';
import {SelectCellService} from "../select-cell/select-cell.service";
import {ResizeTableDirective} from "../resize-table/resize-table.directive";
import {UnitService} from "../united-cell/unit.service";
import {AllCellService} from "../services/all-cell.service";

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
    private unitService: UnitService,
    private allCellService: AllCellService
  ) {
  }

  @HostListener('mousedown', ['$event', '$event.target'])
  onMousedown(event: MouseEvent, el: any) {
    this.resizeTableDirective.resizeTable(event, el)
    if (el.getAttribute('data-type') === 'cell') {
      this.unitService.united = true
      if (el.dataset.unit) {
        const [start, finish] = el.dataset.unit.split('-')
        this.unitService.handleUnit(start, finish)
        event.preventDefault()
        this.allCellService.getCellById(start).nativeElement.focus()
        this.unitService.united = false
        return
      }
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
          this.unitService.united = false
          this.lastId = event.target.dataset.type === 'cell'
            ? event.target.id
            : this.lastId
          this.selectCellService.selectGroup(this.lastId)
        }
      })
      this.unSubMouseup = this.renderer.listen('document', 'mouseup', (event) => {
        this.unMousemove()
        if (this.isGrabbing) {
          this.isGrabbing = false
          this.unSubMouseup()
        }
      })
    }
  }
}
