import {Directive, ElementRef, HostListener, OnInit, Renderer2} from '@angular/core';
import {SelectCellService} from "../services/select-cell.service";
import {getBorder, getByRange, getId} from "../utils";
import {AllCellService} from "../services/all-cell.service";
import {IBorder} from "../interface";
import {FormulaService} from "../services/formula.service";

@Directive({
  selector: '[appSelectCell]'
})
export class SelectCellDirective implements OnInit {

  currentId = ''
  lastId = ''
  currentCell!: ElementRef
  border!: IBorder
  isGrabbing = false
  ids: string[] = []
  private unMousemove: any
  private unSubMouseup: any

  constructor(
    private renderer: Renderer2,
    private selectCellService: SelectCellService,
    private allCellService: AllCellService,
    private formulaService: FormulaService,
  ) {
  }

  ngOnInit() {
  }

  @HostListener('mousedown', ['$event', '$event.target'])
  onMousedown(event: MouseEvent, el: Element) {
    if (el.getAttribute('data-type') === 'cell') {
      if (!event.shiftKey) {
        this.clear()
        this.currentId = el.id

        this.selectCell(this.currentId)

        this.unMousemove = this.renderer.listen('document', 'mousemove', (event) => {
          if (this.lastId !== event.target.id) {
            this.isGrabbing = true
            this.clear()
            this.lastId = event.target.dataset.type === 'cell' ? event.target.id : this.lastId
            this.selectGroup(this.lastId)
          }
        })
      }
      this.unSubMouseup = this.renderer.listen('document', 'mouseup', () => {
        this.unMousemove()
        if (this.isGrabbing) {
          this.isGrabbing = false
          this.selectGroup(this.lastId)
          this.unSubMouseup()
        }
      })
    }
  }
  selectCell(id: string) {
    this.clear()
    this.currentCell = this.selectCellService.selectCell(id)
    this.formulaService.cellInput(this.currentCell.nativeElement.textContent)
    this.currentCell.nativeElement.focus()
    this.renderer.addClass(this.currentCell.nativeElement, 'selected')
  }
  selectGroup(lastId: string) {
    this.renderer.addClass(this.currentCell.nativeElement, 'selected')
    const cols = getByRange(
      getId(lastId).col,
      getId(this.currentId).col)
    const rows = getByRange(
      getId(lastId).row,
      getId(this.currentId).row)

    this.ids = rows.reduce((acc: string[], row) => {
      cols.forEach((col) => {
        acc.push(`${col}:${row}`)
      })
      return acc
    }, [])
    this.border = getBorder(this.ids)
    this.selectCellService.selectedGroup.forEach((cell) => {
      Object.keys(this.border).forEach(key => {
        // @ts-ignore
        if (this.border[key].includes(cell.nativeElement.id)) {
          this.renderer.addClass(cell.nativeElement, key)
        }
      })
    })
    this.selectCellService.selectGroup(this.ids).forEach((cell) => {
      this.renderer.addClass(cell.nativeElement, 'selected-group')
    })
  }
  clear() {
    const clearClass = ['selected-group', 'selected', 'b-top', 'b-right', 'b-left', 'b-bottom']
    this.allCellService.getAllCell().forEach(cell => {
      clearClass.forEach((cl) => {
        this.renderer.removeClass(cell.nativeElement, cl)
      })
    })
    this.selectCellService.clear()
  }
}
