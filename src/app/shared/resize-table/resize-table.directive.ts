import {Directive, Renderer2} from '@angular/core';
import {Store} from "@ngrx/store";

import {ICoords} from "../interface";
import {ResizeUtilsService} from "./resize-utils.service";
import {resizeTable} from "../../store/actions/excel.actions";

@Directive({
  selector: '[appResizeTable]'
})
export class ResizeTableDirective {
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
    private resizeUtils: ResizeUtilsService,
    private store: Store
  ) {
  }

  resizeTable(event: MouseEvent, el: Element) {
    this.type = el.getAttribute('data-type')
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
      if (this.type === 'col' || this.type === 'row') {
        const value = this.resizeUtils.getPosCursor(this.type, ev, this.coords)
        this.renderer.setStyle(el, this.cursorPos, value + 'px')
      }
    })
    this.subMouseup = this.renderer.listen('document', 'mouseup', (ev: MouseEvent) => {
      this.renderer.removeClass(el, 'active')
      this.id = this.id !== null ? this.id : ''
      if (this.type === 'col' || this.type === 'row') {
        const size = this.resizeUtils.getSize(this.type, this.startGrabbing, ev, this.coords)
        this.store.dispatch(resizeTable({
          changeType: this.type,
          data: {[this.id]: size}
        }))
      }
      this.subMousemove()
      this.subMouseup()
    })
  }
}
