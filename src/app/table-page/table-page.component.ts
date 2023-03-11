import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Store} from "@ngrx/store";
import {StoreService} from "../store/store.service";
import {initState} from "../store/actions/excel.actions";

@Component({
  selector: 'app-table-page',
  templateUrl: './table-page.component.html',
  styleUrls: ['./table-page.component.scss']
})
export class TablePageComponent implements OnInit, OnDestroy {
  id = ''

  constructor(
    private route: ActivatedRoute,
    private store: Store,
    public storeService: StoreService
  ) {
  }

  ngOnInit() {
    const id = this.route.snapshot.params['id']
    this.storeService.getById(id).subscribe((state) => {
      this.storeService.loading = false
      this.store.dispatch(initState({state}))
    })
  }

  ngOnDestroy() {
  }

}
