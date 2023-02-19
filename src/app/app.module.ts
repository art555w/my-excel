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
import {GetFromCharCodePipe} from './shared/pipes/get-from-char-code.pipe';
import {ResizeRowDirective} from './shared/directives/resize-row.directive';
import {ResizeColDirective} from "./shared/directives/resize-col.directive";
import {CellStateDirective} from './shared/directives/cell-state.directive';
import {SelectCellDirective} from './shared/directives/select-cell.directive';
import {CellComponent} from './shared/cell/cell.component';

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
    ResizeRowDirective,
    ResizeColDirective,
    CellStateDirective,
    SelectCellDirective,
    CellComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
