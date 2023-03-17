import {Directive, ElementRef, HostListener, OnInit, Renderer2} from '@angular/core';
import {SelectCellService} from "../select-cell/select-cell.service";
import {SelectUtilsService} from "../select-cell/select-utils.service";
import {TableService} from "../services/table.service";
import {AllCellService} from "../services/all-cell.service";
import {UnitService} from "../united-cell/unit.service";

@Directive({
  selector: '[appKeydownTable]'
})
export class KeydownTableDirective implements OnInit {
  nextId = ''
  lastId = ''
  currentCell!: ElementRef
  text = ''
  start = ''
  finish = ''
  inUnited = false

  constructor(
    private selectCellService: SelectCellService,
    private selectUtils: SelectUtilsService,
    private renderer: Renderer2,
    private tableService: TableService,
    private allCellService: AllCellService,
    private unitService: UnitService
  ) {
  }

  ngOnInit() {
  }

  @HostListener('keydown', ['$event', '$event.target'])
  onMousedown(event: KeyboardEvent, el: Element) {
    if (el.getAttribute('data-type') === 'cell') {
      const keys = ['ArrowDown', 'ArrowRight', 'ArrowLeft', 'ArrowUp', 'Tab', 'Enter']
      const {key} = event
      this.nextId = el.id
      this.currentCell = this.selectCellService.currentCell
      if (keys.includes(key)) {
        if (!event.shiftKey) {
          event.preventDefault()
          this.nextId = this.selectUtils.nextCell(key, this.nextId)
          const nextCell = this.allCellService.getCellById(this.nextId)
          if (this.inUnited) {
            this.inUnited = false
            this.unitService.nextCell(key, this.start, this.finish)
            return
          }
          if (nextCell.nativeElement.dataset.unit) {
            [this.start, this.finish] = nextCell.nativeElement.dataset.unit.split('-')
            this.unitService.handleUnit(this.start, this.finish)
            this.inUnited = true
            return
          }
          this.selectCellService.selectCell(this.nextId)
        } else {
          event.preventDefault()
          this.lastId = this.selectCellService.lastId
          this.lastId = this.selectUtils.nextCell(key, this.lastId)
          this.selectCellService.selectGroup(this.lastId)
        }
      } else {
        const subKeyup = this.renderer.listen(this.currentCell.nativeElement, 'keyup', (event) => {
          this.text = this.currentCell.nativeElement.textContent
          this.tableService.tableInput(this.text)
          subKeyup()
        })
      }
    }
  }
}
