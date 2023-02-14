import {Directive, ElementRef, HostListener, Renderer2} from '@angular/core';

@Directive({
  selector: '[appResizeRow]'
})
export class ResizeRowDirective {

  constructor(private renderer: Renderer2, private el: ElementRef) { }

  @HostListener('mousedown', ['$event'])
  onMousedown(event: MouseEvent) {
    event.preventDefault()
    this.renderer.addClass(this.el.nativeElement, 'active')

    const row = this.el.nativeElement.closest('.row')
    const coords = row.getBoundingClientRect()
    const start = event.y

    document.onmousemove = (ev) => {
      event.preventDefault()
      const value = ev.y - coords.y < 20
        ? 20
        : ev.y - coords.y

      this.renderer.setStyle(this.el.nativeElement, 'top', value + 'px')
    }

    document.onmouseup = (ev) => {
      this.renderer.removeClass(this.el.nativeElement, 'active')
      const width = ev.y - start + coords.height < 20
        ? 20
        : ev.y - start + coords.height

      this.renderer.setStyle(row, 'height', width + 'px')
      this.renderer.setStyle(this.el.nativeElement, 'top', null)
      this.renderer.setStyle(this.el.nativeElement, 'bottom', 0)

      document.onmousemove = null
      document.onmouseup = null
    }

  }


}
