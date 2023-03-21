import {Directive, ElementRef, OnDestroy, OnInit, Renderer2} from '@angular/core';
import {Subscription} from "rxjs";

import {SelectCellService} from "./select-cell.service";
import {AllCellService} from "../services/all-cell.service";
import {FormulaService} from "../services/formula.service";
import {TableService} from "../services/table.service";
import {IBorder} from "../interface";

@Directive({
  selector: '[appSelectCell]'
})
export class SelectCellDirective implements OnInit, OnDestroy {

  currentCell!: ElementRef
  groupCell: ElementRef[] = []

  subSelCell!: Subscription
  subSelGroup!: Subscription
  subCells!: Subscription
  subForm!: Subscription
  els: ElementRef[] = []

  constructor(
    private renderer: Renderer2,
    private selectCellService: SelectCellService,
    private allCellService: AllCellService,
    private formulaService: FormulaService,
    private tableService: TableService,
  ) {
  }

  ngOnInit() {
    this.selectCellService.selectUnited$.subscribe(b => {
      this.selectUnited(b)
    })
    this.subSelCell = this.selectCellService.selectCell$.subscribe((cell) => {
      this.selectCell(cell)
    })
    this.subSelGroup = this.selectCellService.selectGroup$.subscribe((cells) => {
      this.selectGroup(cells)
    })
    this.subCells = this.allCellService.cellsGroup$.subscribe(el => {
      this.selectCellService.currentCell = el[0]
      this.selectCellService.lastId = el[0].nativeElement.id
      if (el[0]) {
        this.subCells.unsubscribe()
      }
    })
  }

  ngOnDestroy() {
    if (this.subSelCell) this.subSelCell.unsubscribe()
    if (this.subForm) this.subForm.unsubscribe()
    if (this.subCells) this.subCells.unsubscribe()
    if (this.subSelGroup) this.subSelGroup.unsubscribe()
  }

  selectCell(cell: ElementRef): void {
    this.clear()
    this.currentCell = cell
    this.selectionParent(this.currentCell)
    this.currentCell.nativeElement.focus()
    this.subForm = this.formulaService.formulaInput$.subscribe((text) => {
      this.currentCell.nativeElement.textContent = text
    })
    this.tableService.tableInput(this.currentCell.nativeElement.textContent)
    this.renderer.addClass(this.currentCell.nativeElement, 'selected')
  }

  selectGroup(cells: ElementRef[]): void {
    this.clear()
    this.currentCell.nativeElement.focus()
    this.renderer.addClass(this.currentCell.nativeElement, 'selected')
    this.groupCell = cells
    this.groupCell.forEach(cell => {
      this.renderer.addClass(cell.nativeElement, 'selected-group')
    })
  }

  selectionParent(el: ElementRef) {
    if (this.els.length) {
      this.els.forEach(el => this.renderer.removeClass(el, 'bg-sel'))
      this.els = []
    }
    const col = this.renderer.selectRootElement(`[id="${el.nativeElement.dataset.col}"]`, true)
    const row = this.renderer.selectRootElement(`[id="${el.nativeElement.dataset.row}"]`, true)
    this.els.push(col, row)
    this.els.forEach(el => this.renderer.addClass(el, 'bg-sel'))
  }

  addBorder(px: string): void {
    const border: { [key: string]: any } = this.selectCellService.selectBorder()
    this.groupCell.forEach(cell => {
      Object.keys(border).forEach(key => {
        if (border[key].includes(cell.nativeElement.id)) {
          this.renderer.addClass(cell.nativeElement, key + `-${px}`)
        }
      })
    })
  }

  selectUnited(b: IBorder) {
    this.clear()
    this.addBorder('2px')
  }

  clear() {
    const clearClass = [
      'selected-group',
      'selected',
      'b-top-1px',
      'b-right-1px',
      'b-left-1px',
      'b-bottom-1px',
      'b-top-2px',
      'b-right-2px',
      'b-left-2px',
      'b-bottom-2px']
    this.allCellService.getCells().forEach(cell => {
      clearClass.forEach(cl => {
        this.renderer.removeClass(cell.nativeElement, cl)
      })
    })
  }
}
