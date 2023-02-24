import {Directive, ElementRef, OnInit, Renderer2} from '@angular/core';
import {ResizeTableService} from "./resize-table.service";
import {ICoords} from "../interface";
import {ResizeUtilsService} from "./resize-utils.service";

@Directive({
  selector: '[appResizeTable]'
})
export class ResizeTableDirective implements OnInit {
  subMousemove!: any
  subMouseup!: any
  startGrabbing!: number
  id!: string | null
  type!: string | null
  el!: Element
  coords!: ICoords
  cursorPos = ''

  constructor(
    private renderer: Renderer2,
    private resizeTableService: ResizeTableService,
    private resizeUtils: ResizeUtilsService,
  ) {
  }

  ngOnInit() {
    this.resizeTableService.elsRef$.subscribe((data) => {
      this.addSizeTable(data.type, data.els, data.size)
    })
  }

  resizeTable(event: MouseEvent, el: Element) {
    this.type = el.getAttribute('data-type')
    if (this.type === 'col' || this.type === 'row') {
      if (this.type === 'col') {
        event.preventDefault()
        this.renderer.addClass(el, 'active')
        this.id = el.getAttribute('data-resize')
        this.startGrabbing = event.x
        this.el = this.renderer.selectRootElement(`[data-col="${this.id}"]`, true)
        this.coords = this.el.getBoundingClientRect()
        this.cursorPos = 'left'
      } else if (this.type === 'row') {
        event.preventDefault()
        this.renderer.addClass(el, 'active')
        this.id = el.getAttribute('data-resize')
        this.el = this.renderer.selectRootElement(`[data-row="${this.id}"]`, true)
        this.startGrabbing = event.y
        this.coords = this.el.getBoundingClientRect()
        this.cursorPos = 'top'
      }

      this.subMousemove = this.renderer.listen('document', 'mousemove', (ev: MouseEvent) => {
        if (this.type !== null) {
          const value = this.resizeUtils.getPosCursor(this.type, ev, this.coords)
          this.renderer.setStyle(el, this.cursorPos, value + 'px')
        }
      })
      this.subMouseup = this.renderer.listen('document', 'mouseup', (ev: MouseEvent) => {
        this.renderer.removeClass(el, 'active')
        this.id = this.id !== null ? this.id : ''
        if (this.type !== null) {
          const size = this.resizeUtils.getSize(this.type, this.startGrabbing, ev, this.coords)
          this.resizeTableService.resizeTable(this.type, this.id, size)
          if (this.type === 'col') {
            this.renderer.setStyle(this.el, 'width', size + 'px')
          }
        }
        this.subMousemove()
        this.subMouseup()
      })
    }
  }

  addSizeTable(type: string, els: ElementRef[], size: number) {
    const style = type === 'col' ? 'width' : 'height'
    els.forEach(el => {
      this.renderer.setStyle(el.nativeElement, style, size + 'px')
    })
  }
}
