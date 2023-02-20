import {Directive, ElementRef, OnInit, Renderer2} from '@angular/core';
import {ICellState} from "../interface";
import {AllCellService} from "../services/all-cell.service";

@Directive({
  selector: '[appCellState]'
})
export class CellStateDirective implements OnInit {



  constructor(private el: ElementRef, private renderer: Renderer2, private allCell: AllCellService) {

  }

  ngOnInit() {
    this.allCell.buildCells(this.el)
  }

}
