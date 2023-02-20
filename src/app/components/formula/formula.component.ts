import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {CellStateService} from "../../shared/services/cell-state.service";
import {FormulaService} from "../../shared/services/formula.service";
import {SelectCellService} from "../../shared/services/select-cell.service";

@Component({
  selector: 'app-formula',
  templateUrl: './formula.component.html',
  styleUrls: ['./formula.component.scss']
})
export class FormulaComponent implements OnInit{

  @ViewChild('input')
  elRef!: ElementRef

  constructor(private formulaService: FormulaService, private selectCellService: SelectCellService) {
  }

  ngOnInit() {
    this.formulaService.cellText.subscribe((text) => {
      this.elRef.nativeElement.textContent = text
    })
  }

  onKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      event.preventDefault()
      this.selectCellService.current.nativeElement.focus()
    }
    const text = this.elRef.nativeElement.textContent
    this.formulaService.formulaInput(text)
  }
}
