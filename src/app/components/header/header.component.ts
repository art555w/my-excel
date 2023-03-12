import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {StoreService} from "../../database/services/store.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  id = ''
  subUpdate!: Subscription

  constructor(public storeService: StoreService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.subUpdate = this.storeService.updateState().subscribe((response) => {
      this.storeService.update = false
    })

  }

  ngOnDestroy() {
  }

}
