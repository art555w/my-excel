import {Directive, ElementRef, HostListener, Renderer2} from '@angular/core';

@Directive({
  selector: '[appResizeCol]'
})
export class ResizeColDirective {

  constructor(private renderer: Renderer2, private el: ElementRef) { }

  @HostListener('mousedown', ['$event'])
  onMousedown(event: MouseEvent) {
    event.preventDefault()
    this.renderer.addClass(this.el.nativeElement, 'active')

    const col = this.el.nativeElement.closest('.column')
    const id = col.dataset.id
    const coords = col.getBoundingClientRect()
    const allCols = document.querySelectorAll(`[data-id=${id}]`)
    const start = event.x

    document.onmousemove = (ev) => {
      event.preventDefault()
      const value = ev.x - coords.x < 40
        ? 40
        : ev.x - coords.x

      this.renderer.setStyle(this.el.nativeElement, 'left', value + 'px')
    }

    document.onmouseup = (ev) => {
      this.renderer.removeClass(this.el.nativeElement, 'active')
      const width = ev.x - start + coords.width < 40
        ? 40
        : ev.x - start + coords.width

      allCols.forEach((column) => {
        this.renderer.setStyle(column, 'width', width + 'px')
      })
      this.renderer.setStyle(this.el.nativeElement, 'right', -1 + 'px')
      this.renderer.setStyle(this.el.nativeElement, 'left', null)

      document.onmousemove = null
      document.onmouseup = null
    }
  }

}
