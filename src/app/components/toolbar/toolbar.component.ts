import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {Subscription} from "rxjs";

import {IIcons} from "../../shared/interface";
import {styleState} from "../../store/actions/excel.actions";
import {ToolbarService} from "../../shared/services/toolbar.service";
import {SelectCellService} from "../../shared/select-cell/select-cell.service";
import {TableService} from "../../shared/services/table.service";

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit, OnDestroy {

  icons!: IIcons[]
  ids: string[] = []
  subIcon!: Subscription
  toggle = false
  type = ''
  colors = [
    {color: '#000'},
    {color: '#fcd902'},
    {color: '#00ffdf'},
    {color: '#e200ff'},
    {color: '#fff'},
    {color: '#774c4c'},
    {color: '#002aff'},
    {color: '#FF0000FF'},
    {color: '#00ff66'},
    {color: '#ccc'}]

  constructor(
    private toolbarService: ToolbarService,
    private store: Store,
    private selectCellService: SelectCellService,
    private tableService: TableService,
  ) {
  }

  ngOnInit() {
    this.subIcon = this.toolbarService.icons$.subscribe(icons => {
      this.icons = icons
    })
  }

  onClick(event: any, data: IIcons) {
    this.type = event.target.dataset.type
    if (this.type === 'unit') {
      console.log(this.selectCellService.selectBorder());
      return
    }
    if (this.type) {
      this.toggle = !this.toggle
      return
    }

    this.ids = this.selectCellService.groupId
    this.tableService.applyStyle(data.style)
    this.ids.forEach(id => {
      this.store.dispatch(styleState({
        data: {[id]: {...data.style}}
      }))
    })

    this.selectCellService.currentCell.nativeElement.focus()
  }

  ngOnDestroy() {
    if (this.subIcon) {
      this.subIcon.unsubscribe()
    }
  }

  changeColor(color: string) {
    this.ids = this.selectCellService.groupId
    this.ids.forEach(id => {
      this.store.dispatch(styleState({
        data: {[id]: {[this.type]: color}}
      }))
    })
    this.tableService.applyStyle({[this.type]: color})
    this.toggle = !this.toggle
  }
}
