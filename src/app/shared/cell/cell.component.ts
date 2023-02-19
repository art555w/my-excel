import {Component, Input, OnInit} from '@angular/core';

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

  constructor() {
  }

  ngOnInit() {
    this.id = `${this.numCol}:${this.numRow}`
  }


  onKeydown(event: KeyboardEvent) {
    const keys = ['ArrowRight', 'Tab', 'ArrowDown', 'Enter', 'ArrowUp', 'ArrowLeft',]
    const {key} = event
    if (keys.includes(key)) {
      switch (key) {
        case 'ArrowRight':
        case 'Tab':
          // this.selectCellDirective.selCell(`${this.numCol + 2}:${this.numRow + 1}`)
          console.log('tab')
          break
        case 'ArrowDown':
        case 'Enter':
          console.log(key)
          break
        case 'ArrowUp':
          console.log(key)
          break
        case 'ArrowLeft':
          console.log(key)
      }
    }
  }
}
