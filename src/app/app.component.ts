import {AfterContentChecked, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterContentChecked {

  constructor(private store: Store, private changeDetector: ChangeDetectorRef) {
  }

  ngOnInit() {
  }

  ngAfterContentChecked() {
    this.changeDetector.detectChanges()
  }
}
