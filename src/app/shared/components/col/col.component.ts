import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-col',
  templateUrl: './col.component.html',
  styleUrls: ['./col.component.scss']
})
export class ColComponent implements OnInit {

  @Input()
  col = ''
  colWidth!: { width: string }

  constructor() {
  }

  ngOnInit() {
    this.colWidth = {
      width: '120px'
    }
  }
}
