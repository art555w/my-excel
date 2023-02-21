import {Directive, ElementRef, OnInit} from '@angular/core';
import {AllCellService} from "../services/all-cell.service";

@Directive({
  selector: '[appInitCells]'
})
export class InitCellsDirective implements OnInit {

  constructor(private elRef: ElementRef, private allCellService: AllCellService) { }

  ngOnInit() {
    this.allCellService.buildCells(this.elRef)
  }

}
