import {Directive, ElementRef, Host, HostListener, Renderer2} from '@angular/core';
import {SelectCellService} from "./select-cell.service";
import {IBorder} from "../interface";
import {AllCellService} from "../services/all-cell.service";

@Directive({
  selector: '[appSelectCell]'
})
export class SelectCellDirective {

  currentId = ''
  lastId = ''
  currentCell!: ElementRef
  groupCell: ElementRef[] = []
  isGrabbing = false
  ids: string[] = []
  private unMousemove: any
  private unSubMouseup: any

  constructor(
    private renderer: Renderer2,
    private selectCellService: SelectCellService,
    private allCellService: AllCellService
  ) {
  }


  @HostListener('mousedown', ['$event', '$event.target'])
  onMousedown(event: MouseEvent, el: Element) {
    if (el.getAttribute('data-type') === 'cell') {
      if (!event.shiftKey) {
        this.clear()
        this.currentId = el.id
        this.selectCell(this.currentId)
      } else {
        this.clear()
        this.lastId = el.id
        this.isGrabbing = true
        this.selectGroup(this.lastId)
      }
      this.unMousemove = this.renderer.listen('document', 'mousemove', event => {
        if (this.lastId !== event.target.id) {
          this.clear()
          this.isGrabbing = true
          this.lastId = event.target.dataset.type === 'cell'
            ? event.target.id
            : this.lastId
          this.selectGroup(this.lastId)
        }
      })
      this.unSubMouseup = this.renderer.listen('document', 'mouseup', () => {
        this.unMousemove()
        if (this.isGrabbing) {
          this.isGrabbing = false
          this.addBorder()
          this.unSubMouseup()
        }
      })

    }
  }

  selectCell(id: string) {
    this.clear()
    this.currentCell = this.selectCellService.selectCell(id)
    this.currentCell.nativeElement.focus()
    this.renderer.addClass(this.currentCell.nativeElement, 'selected')
  }

  selectGroup(lastId: string) {
    this.currentCell.nativeElement.focus()
    this.renderer.addClass(this.currentCell.nativeElement, 'selected')
    this.groupCell = this.selectCellService.selectGroup(lastId)
    this.groupCell.forEach(cell => {
      this.renderer.addClass(cell.nativeElement, 'selected-group')
    })
  }

  addBorder() {
    const border = this.selectCellService.selectBorder()
    this.groupCell.forEach(cell => {
      Object.keys(border).forEach(key => {
        // @ts-ignore
        if (border[key].includes(cell.nativeElement.id)) {
          this.renderer.addClass(cell.nativeElement, key)
        }
      })
    })
  }

  clear() {
    const clearClass = ['selected-group', 'selected', 'b-top', 'b-right', 'b-left', 'b-bottom']
    this.allCellService.getCells().forEach(cell => {
      clearClass.forEach(cl => {
        this.renderer.removeClass(cell.nativeElement, cl)
      })
    })
  }
}
