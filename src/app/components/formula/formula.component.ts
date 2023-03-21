import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Subscription} from "rxjs";

import {FormulaService} from "../../shared/services/formula.service";
import {TableService} from "../../shared/services/table.service";
import {SelectCellService} from "../../shared/select-cell/select-cell.service";

@Component({
  selector: 'app-formula',
  templateUrl: './formula.component.html',
  styleUrls: ['./formula.component.scss']
})
export class FormulaComponent implements OnInit, OnDestroy {

  @ViewChild('formulaRef')
  formulaRef!: ElementRef

  @ViewChild('infoRef')
  infoRef!: ElementRef
  text = ''
  subInput!: Subscription
  subSelect!: Subscription
  selectedPos = 'A1'
  id = ''
  CODE = 64


  constructor(
    private formulaService: FormulaService,
    public tableService: TableService,
    private selectCellService: SelectCellService
  ) {
  }

  ngOnInit() {
    this.subInput = this.tableService.tableInput$.subscribe(text => {
      this.text = text
    })
    this.subSelect = this.selectCellService.selectedPos$.subscribe(id => {
      this.selectedPos = id
      this.infoRef.nativeElement.textContent = id
    })
  }

  ngOnDestroy() {
    if (this.subInput) {
      this.subInput.unsubscribe()
    }
    if (this.selectedPos) {
      this.subSelect.unsubscribe()
    }
  }

  onInput() {
    this.formulaService.formulaInput(this.formulaRef.nativeElement.textContent)
  }

  onKeydown(event: KeyboardEvent) {
    const {key} = event
    const keys = ['Enter', 'Tab']
    if (keys.includes(key)) {
      event.preventDefault()
      this.formulaService.formulaDone()
      if (this.id) {
        this.selectCellService.selectCell(this.id)
        this.infoRef.nativeElement.textContent = this.selectedPos
      }
    }
  }

  onInfo() {
    const text = this.infoRef.nativeElement.textContent.toUpperCase().trim()
    if (text.trim()) {
      this.id = `${text[0].charCodeAt() - this.CODE}:${text.slice(1)}`
    }
  }
}
