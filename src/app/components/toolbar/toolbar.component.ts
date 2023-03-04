import {Component, OnDestroy, OnInit} from '@angular/core';
import {IIcons} from "../../shared/interface";
import {styleState} from "../../store/actions/excel.actions";
import {ToolbarService} from "../../shared/services/toolbar.service";
import {Store} from "@ngrx/store";
import {SelectCellService} from "../../shared/select-cell/select-cell.service";
import {Subscription} from "rxjs";
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

  constructor(
    private toolbarService: ToolbarService,
    private store: Store,
    private selectCellService: SelectCellService,
    private tableService: TableService
  ) {
  }

  ngOnInit() {
    this.subIcon = this.toolbarService.icons$.subscribe(icons => {
      this.icons = icons
    })
  }

  onClick(data: IIcons) {
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
}
