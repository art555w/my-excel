import {Directive, ElementRef, HostListener, OnInit, Renderer2} from '@angular/core';
import {SelectCellService} from "../services/select-cell.service";
import {getByRange} from "../utils";

@Directive({
  selector: '[appSelectCell]'
})
export class SelectCellDirective implements OnInit {

  currentId = ''
  lastId = ''

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private selectCellService: SelectCellService
  ) {
  }

  ngOnInit() {
    const cell = this.selectCellService.selectCell('1:1')
    this.renderer.addClass(cell, 'selected')
  }


  @HostListener('mousedown', ['$event'])
  onMousedown(event: MouseEvent) {
    if (!event.shiftKey) {
      this.clear()
      this.currentId = this.el.nativeElement.id
      const cell = this.selectCellService.selectCell(this.currentId)
      this.renderer.addClass(cell, 'selected')
    } else {
      event.preventDefault()
      this.clear()
      this.lastId = this.el.nativeElement.id
      this.currentId = this.selectCellService.current

      const cols = getByRange(
        +this.lastId.split(':')[0],
        +this.currentId.split(':')[0])
      const rows = getByRange(
        +this.lastId.split(':')[1],
        +this.currentId.split(':')[1])


      const ids = rows.reduce((acc:string[], row )=> {
        cols.forEach((col) => {
          acc.push(`${col}:${row}`)
        })
        return acc
      },[])

      console.log(ids)

      this.selectCellService.selectGroup(ids).forEach((cell) => {
        this.renderer.addClass(cell, 'selected')
      })
    }

  }

  private clear() {
    this.selectCellService.selectGroup(null).forEach(cell => {
      this.renderer.removeClass(cell, 'selected')
    })
    this.selectCellService.clear()
  }
}
