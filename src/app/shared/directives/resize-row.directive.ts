import {Directive, ElementRef, HostListener, Renderer2} from '@angular/core';
import {AllCellService} from "../services/all-cell.service";

@Directive({
  selector: '[appResizeRow]'
})
export class ResizeRowDirective {

  private subMousemove!: any
  private subMouseup!: any

  constructor(private renderer: Renderer2, private el: ElementRef) {
  }

  @HostListener('mousedown', ['$event'])
  onMousedown(event: MouseEvent) {
    event.preventDefault()
    this.renderer.addClass(this.el.nativeElement, 'active')

    const id = this.el.nativeElement.dataset.resize
    const row = this.el.nativeElement.closest(`[data-row="${id}"]`)
    const coords = row.getBoundingClientRect()
    const start = event.y

    this.subMousemove = this.renderer.listen('document', 'mousemove', (ev: MouseEvent) => {
      event.preventDefault()
      const value = ev.y - coords.y < 20
        ? 20
        : ev.y - coords.y

      this.renderer.setStyle(this.el.nativeElement, 'top', value + 'px')
    })

    this.subMouseup = this.renderer.listen('document', 'mouseup', (ev: MouseEvent) => {
      this.renderer.removeClass(this.el.nativeElement, 'active')
      const width = ev.y - start + coords.height < 20
        ? 20
        : ev.y - start + coords.height

      this.renderer.setStyle(row, 'height', width + 'px')
      this.renderer.setStyle(this.el.nativeElement, 'top', null)
      this.renderer.setStyle(this.el.nativeElement, 'bottom', 0)

      this.subMousemove()
      this.subMouseup()
    })

  }


}
