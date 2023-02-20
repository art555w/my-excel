import {Directive, HostListener, OnInit, Renderer2} from '@angular/core';
import {SelectCellDirective} from "./select-cell.directive";
import {getId} from "../utils";
import {TableComponent} from "../../components/table/table.component";
import {SelectCellService} from "../services/select-cell.service";

@Directive({
  selector: '[appSelectByKey]'
})
export class SelectByKeyDirective implements OnInit {

  nextId = ''
  MIN_VALUE = 1
  amountCols!: number
  amountRows!: number
  unKeyUp!: any

  constructor(
    private renderer: Renderer2,
    private selectCellDirective: SelectCellDirective,
    private selectCellService: SelectCellService,
    private table: TableComponent) {
  }

  ngOnInit() {
    this.amountCols = this.table.amountCols
    this.amountRows = this.table.amountRows

  }

  @HostListener('keydown', ['$event', '$event.target'])
  onKeydown(event: KeyboardEvent, el: Element) {
    if (el.getAttribute('data-type') === 'cell') {
      const keys = ['ArrowDown', 'ArrowRight', 'ArrowLeft', 'ArrowUp', 'Tab', 'Enter']
      const {key} = event
      let {col, row} = getId(el.id)

      if (keys.includes(key)) {
        if (!event.shiftKey) {
          event.preventDefault()
          this.nextId = this.nextCell(key, col, row)
          this.selectCellDirective.selectCell(this.nextId)
        }else {
          event.preventDefault()
          const {col, row} = getId(this.nextId)
          this.nextId = this.nextCell(key, col, row)
          const nextCell = this.selectCellService.selectCell(this.nextId)
          this.nextId = nextCell.nativeElement.id
          this.selectCellDirective.clear()
          this.selectCellDirective.selectGroup(this.nextId)
          this.unKeyUp = this.renderer.listen('document', 'keyup', () => {
            this.selectCellDirective.selectGroup(this.nextId)
            this.unKeyUp()
          })
        }

      }

    }
  }

  nextCell(key: string, col: number, row: number) {
    switch (key) {
      case 'ArrowRight':
      case 'Tab':
        col = col === this.amountCols ? this.amountCols : col + 1
        break
      case 'ArrowDown':
      case 'Enter':
        row = row === this.amountRows ? this.amountRows : row + 1
        break
      case 'ArrowLeft':
        col = col === this.MIN_VALUE ? this.MIN_VALUE : col - 1
        break
      case 'ArrowUp':
        row = row === this.MIN_VALUE ? this.MIN_VALUE : row - 1
        break
    }
    return `${col}:${row}`
  }

}
