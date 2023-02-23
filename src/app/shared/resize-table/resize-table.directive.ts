import {Directive, HostListener, OnInit, Renderer2} from '@angular/core';
import {ResizeTableService} from "./resize-table.service";
import {Subscription} from "rxjs";
import {Store} from "@ngrx/store";
import {colSelector} from "../../store/selectors/excel.selector";

@Directive({
  selector: '[appResizeTable]'
})
export class ResizeTableDirective implements OnInit {
  subMousemove!: any
  subMouseup!: any
  startGrabbing!: number
  id!: string | null
  subCol!: Subscription

  colState$ = this.store.select(colSelector)

  constructor(private renderer: Renderer2, private resizeTableService: ResizeTableService, private store: Store) {
  }

  ngOnInit() {
  }

  @HostListener('mousedown', ['$event', '$event.target'])
  onMousedown(event: MouseEvent, el: Element) {
    if (el.getAttribute('data-type') === 'col') {
      event.preventDefault()
      this.renderer.addClass(el, 'active')
      const type = 'col'
      this.id = el.getAttribute('data-resize')
      this.startGrabbing = event.x
      const col = this.renderer.selectRootElement(`[data-col="${this.id}"]`, true)
      const coords = col.getBoundingClientRect()

      this.subMousemove = this.renderer.listen('document', 'mousemove', (ev: MouseEvent) => {
        const value = this.resizeTableService.posCursor(type, ev, coords.x)
        this.renderer.setStyle(el, 'left', value + 'px')
      })

      this.subMouseup = this.renderer.listen('document', 'mouseup', (ev: MouseEvent) => {
        this.renderer.removeClass(el, 'active')
        this.id = this.id !== null ? this.id : ''
        const els = this.resizeTableService.resizeCol(this.id, this.startGrabbing, ev, coords.width)

        this.colState$.subscribe((state: { [key: string]: number }) => {
          els.forEach((el) => {
            console.log(this.id)
            this.renderer.setStyle(el.nativeElement, 'width', state[el.nativeElement.dataset.col] + 'px')
          })
          this.renderer.setStyle(col, 'width', state[col.id] + 'px')
        }).unsubscribe()
        this.subMousemove()
        this.subMouseup()
      })
    }
    if (el.getAttribute('data-type') === 'row') {
      event.preventDefault()
      this.renderer.addClass(el, 'active')

      this.id = el.getAttribute('data-resize')
      const row = this.renderer.selectRootElement(`[data-row="${this.id}"]`, true)
      this.startGrabbing = event.y
      const type = 'row'
      const coords = row.getBoundingClientRect()

      this.subMousemove = this.renderer.listen('document', 'mousemove', (ev: MouseEvent) => {
        const value = this.resizeTableService.posCursor(type, ev, coords.y)
        this.renderer.setStyle(el, 'top', value + 'px')
      })

      this.subMouseup = this.renderer.listen('document', 'mouseup', (ev: MouseEvent) => {
        this.renderer.removeClass(el, 'active')
        this.id = this.id !== null ? this.id : ''
        const data = this.resizeTableService.resizeRow(this.id, this.startGrabbing, ev, coords.height)
        data.els?.forEach(el => {
          this.renderer.setStyle(el.nativeElement, 'height', data.value + 'px')
        })
        this.subMousemove()
        this.subMouseup()
      })
    }
  }
}
