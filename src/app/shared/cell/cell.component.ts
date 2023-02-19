import {Component, Input, OnInit} from '@angular/core';
import {SelectCellService} from "../services/select-cell.service";
import {SelectCellDirective} from "../directives/select-cell.directive";

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.scss']
})
export class CellComponent implements OnInit {

  @Input() numRow = 0
  @Input() numCol = 0
  @Input() col = 0
  id = ''

  constructor(private selectCellService: SelectCellService, private selectCellDirective: SelectCellDirective) {
  }

  ngOnInit() {
    this.id = `${this.numCol + 1}:${this.numRow + 1}`
  }


  onKeydown(event: KeyboardEvent) {

  }
}
