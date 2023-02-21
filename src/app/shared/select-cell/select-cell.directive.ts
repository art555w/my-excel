import {Directive, ElementRef, Host, HostListener, OnInit, Renderer2} from '@angular/core';
import {SelectCellService} from "./select-cell.service";
import {IBorder} from "../interface";
import {AllCellService} from "../services/all-cell.service";

@Directive({
  selector: '[appSelectCell]'
})
export class SelectCellDirective implements OnInit{

  currentCell!: ElementRef
  groupCell: ElementRef[] = []
  ids: string[] = []

  constructor(
    private renderer: Renderer2,
    private selectCellService: SelectCellService,
    private allCellService: AllCellService
  ) {
  }

  ngOnInit() {
    this.selectCellService.selectCell$.subscribe((cell) => {
      this.selectCell(cell)
    })
    this.selectCellService.selectGroup$.subscribe((cells) => {
      this.selectGroup(cells)
    })
  }

  selectCell(cell: ElementRef) {
    this.clear()
    this.currentCell = cell
    this.currentCell.nativeElement.focus()
    this.renderer.addClass(this.currentCell.nativeElement, 'selected')
  }

  selectGroup(cells: ElementRef[]) {
    this.clear()
    this.currentCell.nativeElement.focus()
    this.renderer.addClass(this.currentCell.nativeElement, 'selected')
    this.groupCell = cells
    this.groupCell.forEach(cell => {
      this.renderer.addClass(cell.nativeElement, 'selected-group')
    })
    this.addBorder()
  }

  addBorder() {
    const border = this.selectCellService.selectBorder()
    this.groupCell.forEach(cell => {
      Object.keys(border).forEach(key => {
        // @ts-ignore
        if (border[key].includes(cell.nativeElement.id)) {
          this.renderer.addClass(cell.nativeElement, key)
        }
      })
    })
  }

  clear() {
    const clearClass = ['selected-group', 'selected', 'b-top', 'b-right', 'b-left', 'b-bottom']
    this.allCellService.getCells().forEach(cell => {
      clearClass.forEach(cl => {
        this.renderer.removeClass(cell.nativeElement, cl)
      })
    })
  }
}
