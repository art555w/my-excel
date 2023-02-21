import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {DashboardPageComponent} from './dashboard-page/dashboard-page.component';
import {TablePageComponent} from './table-page/table-page.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HeaderComponent} from './components/header/header.component';
import {ToolbarComponent} from './components/toolbar/toolbar.component';
import {FormulaComponent} from './components/formula/formula.component';
import {TableComponent} from './components/table/table.component';
import {MatIconModule} from "@angular/material/icon";
import {GetFromCharCodePipe} from "./shared/pipes/get-from-char-code.pipe";
import { InitCellsDirective } from './shared/directives/init-cells.directive';
import { ResizeTableDirective } from './shared/resize-table/resize-table.directive';
import { SelectCellDirective } from './shared/select-cell/select-cell.directive';
import { MousedownTableDirective } from './shared/directives/mousedown-table.directive';
import { KeydownTableDirective } from './shared/directives/keydown-table.directive';

@NgModule({
  declarations: [
    AppComponent,
    DashboardPageComponent,
    TablePageComponent,
    HeaderComponent,
    ToolbarComponent,
    FormulaComponent,
    TableComponent,
    GetFromCharCodePipe,
    InitCellsDirective,
    ResizeTableDirective,
    SelectCellDirective,
    MousedownTableDirective,
    KeydownTableDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
