import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormulaService} from "../../shared/services/formula.service";
import {TableService} from "../../shared/services/table.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-formula',
  templateUrl: './formula.component.html',
  styleUrls: ['./formula.component.scss']
})
export class FormulaComponent implements OnInit, OnDestroy {

  @ViewChild('formulaRef')
  formulaRef!: ElementRef
  text = ''
  subInput!: Subscription


  constructor(
    private formulaService: FormulaService,
    public tableService: TableService,
  ) {
  }

  ngOnInit() {
    this.subInput = this.tableService.tableInput$.subscribe(text => {
      this.text = text
    })
  }

  ngOnDestroy() {
    if (this.subInput) {
      this.subInput.unsubscribe()
    }
  }

  onInput(event: KeyboardEvent) {
    this.formulaService.formulaInput(this.formulaRef.nativeElement.textContent)
  }

  onKeydown(event: KeyboardEvent) {
    const {key} = event
    const keys = ['Enter', 'Tab']
    if (keys.includes(key)) {
      event.preventDefault()
      this.formulaService.formulaDone()
    }
  }
}
