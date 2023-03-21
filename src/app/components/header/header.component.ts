import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";

import {StoreService} from "../../database/services/store.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  id = ''
  subUpdate!: Subscription

  constructor(public storeService: StoreService) {
  }

  ngOnInit() {
    this.subUpdate = this.storeService.updateState().subscribe((response) => {
      this.storeService.update = false
    })

  }

  ngOnDestroy() {
    if (this.subUpdate) {
      this.subUpdate.unsubscribe()
    }
  }

}
