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
            this.selectGroup(this.currentId, this.lastId)
          }
        })

      } else {
        event.preventDefault()
        this.clear()
        this.isGrabbing = true
        this.lastId = el.id

        this.selectGroup(this.currentId, this.lastId)

      }
      this.unSubMouseup = this.renderer.listen('document', 'mouseup', () => {
        this.unMousemove()
        if (this.isGrabbing) {
          this.selectCellService.selectedGroup.forEach((cell) => {
            Object.keys(this.border).forEach(key => {
              // @ts-ignore
              if (this.border[key].includes(cell.id)) {
                this.renderer.addClass(cell, key)
              }
            })
          })
          this.isGrabbing = false
          this.unSubMouseup()
        }
      })
    }
  }

  selectCell(id: string) {
    this.clear()
    this.currentCell = this.selectCellService.selectCell(id)
    this.renderer.addClass(this.currentCell, 'selected')
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
    const clearClass = ['selected-group', 'selected', 'b-top', 'b-right', 'b-left', 'b-bottom']
    this.allCellService.getAllCell().forEach(cell => {
      clearClass.forEach((cl) => {
        this.renderer.removeClass(cell, cl)
      })
    })
    this.selectCellService.clear()
  }
}
