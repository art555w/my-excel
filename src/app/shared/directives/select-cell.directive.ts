import {Directive, HostListener, OnInit, Renderer2} from '@angular/core';
import {SelectCellService} from "../services/select-cell.service";
import {getBorder, getByRange, getId} from "../utils";
import {AllCellService} from "../services/all-cell.service";
import {IBorder} from "../interface";
import {TableComponent} from "../../components/table/table.component";

@Directive({
  selector: '[appSelectCell]'
})
export class SelectCellDirective implements OnInit {

  currentId = ''
  lastId = ''
  currentCell!: Element
  grabCell!: Element
  border!: IBorder
  isGrabbing = false
  ids: string[] = []
  private unMousemove: any
  private unSubMouseup: any

  constructor(
    private renderer: Renderer2,
    private selectCellService: SelectCellService,
    private allCellService: AllCellService,
    private tableComponent: TableComponent
  ) {}
  ngOnInit() {
  }

  @HostListener('mousedown', ['$event', '$event.target'])
  onMousedown(event: MouseEvent, el: Element) {
    if (el.getAttribute('data-type') === 'cell') {
      if (!event.shiftKey) {
        this.clear()
        this.currentId = el.id
        this.currentCell = this.selectCellService.selectCell(this.currentId)
        this.grabCell = this.currentCell

        this.selectCell(this.currentCell)

        this.unMousemove = this.renderer.listen('document', 'mousemove', (event) => {
          this.lastId = event.target.dataset.type === 'cell' ? event.target.id : this.lastId
          if (this.grabCell.id !== event.target.id) {
            this.isGrabbing = true
            this.clear()
            this.grabCell = this.selectCellService.selectCell(this.lastId)
            this.selectGroup(this.currentId, this.lastId)
          }
        })

      } else {
        event.preventDefault()
        this.clear()
        this.isGrabbing = true
        this.lastId = el.id
        this.currentId = this.currentCell.id

        this.selectGroup(this.currentId, this.lastId)

      }
      this.unSubMouseup = this.renderer.listen('document', 'mouseup', () => {
        this.unMousemove()
        if (this.isGrabbing) {
          this.selectCellService.selectedGroup.forEach((cell) => {
            if (this.border["border-top"].includes(cell.id)) {
              this.renderer.addClass(cell, 'b-top')
            }
            if (this.border["border-right"].includes(cell.id)) {
              this.renderer.addClass(cell, 'b-right')
            }
            if (this.border["border-left"].includes(cell.id)) {
              this.renderer.addClass(cell, 'b-left')
            }
            if (this.border["border-bottom"].includes(cell.id)) {
              this.renderer.addClass(cell, 'b-bottom')
            }
          })
          this.renderer.addClass(this.currentCell, 'selected')
          this.isGrabbing = false
          this.unSubMouseup()
        }
      })
    }
  }

  selectCell(currentEl: Element) {
    this.renderer.addClass(currentEl, 'selected')
  }
  selectGroup(currentId: string, lastId: string) {
    this.renderer.addClass(this.currentCell, 'selected')
    const cols = getByRange(
      getId(lastId).col,
      getId(currentId).col)
    const rows = getByRange(
      getId(lastId).row,
      getId(currentId).row)

    this.ids = rows.reduce((acc: string[], row) => {
      cols.forEach((col) => {
        acc.push(`${col}:${row}`)
      })
      return acc
    }, [])

    this.border = getBorder(this.ids)
    this.selectCellService.selectGroup(this.ids).forEach((cell) => {
      this.renderer.addClass(cell, 'selected-group')
    })
  }

  private clear() {
    this.allCellService.getAllCell().forEach(cell => {
      this.renderer.removeClass(cell, 'selected-group')
      this.renderer.removeClass(cell, 'selected')
      this.renderer.removeClass(cell, 'b-top')
      this.renderer.removeClass(cell, 'b-right')
      this.renderer.removeClass(cell, 'b-left')
      this.renderer.removeClass(cell, 'b-bottom')
    })
    this.selectCellService.clear()
  }
}
