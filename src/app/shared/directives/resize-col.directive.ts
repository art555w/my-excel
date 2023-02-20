import {Directive, ElementRef, HostListener, OnInit, Renderer2} from '@angular/core';
import {CellStateDirective} from "./cell-state.directive";
import {AllCellService} from "../services/all-cell.service";

@Directive({
  selector: '[appResizeCol]'
})
export class ResizeColDirective implements OnInit {

  private subMousemove!: any
  private subMouseup!: any

  constructor(
    private renderer: Renderer2,
    private el: ElementRef,
    private cellSate: CellStateDirective,
    private allCell: AllCellService

  ) {}

  ngOnInit() {
  }

  @HostListener('mousedown', ['$event'])
  onMousedown(event: MouseEvent) {
    event.preventDefault()
    this.renderer.addClass(this.el.nativeElement, 'active')

    const id: string = this.el.nativeElement.dataset.resize
    const col = this.el.nativeElement.closest(`[data-col="${id}"]`)
    const coords = col.getBoundingClientRect()
    const allCols = this.allCell.getCols(id)
    const startGrabbing = event.x

    this.subMousemove = this.renderer.listen('document', 'mousemove', (ev: MouseEvent) => {
      event.preventDefault()
      const value = ev.x - coords.x < 40
        ? 40
        : ev.x - coords.x

      this.renderer.setStyle(this.el.nativeElement, 'left', value + 'px')
    })

    this.subMouseup = this.renderer.listen('document', 'mouseup', (ev: MouseEvent) => {
      this.renderer.removeClass(this.el.nativeElement, 'active')
      const width = ev.x - startGrabbing + coords.width < 40
        ? 40
        : ev.x - startGrabbing + coords.width

      allCols.forEach((column) => {
        this.renderer.setStyle(column.nativeElement, 'width', width + 'px')
      })
      this.renderer.setStyle(this.el.nativeElement, 'right', -1 + 'px')
      this.renderer.setStyle(this.el.nativeElement, 'left', null)

      this.subMousemove()
      this.subMouseup()
    })

  }

}
