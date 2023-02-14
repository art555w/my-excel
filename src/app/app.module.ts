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
import {CellComponent} from "./shared/cell/cell.component";
import {GetCharCodePipe} from './shared/pipes/get-char-code.pipe';
import {ResizeRowDirective} from './shared/directives/resize-row.directive';
import {ResizeColDirective} from "./shared/directives/resize-col.directive";

@NgModule({
  declarations: [
    AppComponent,
    DashboardPageComponent,
    TablePageComponent,
    HeaderComponent,
    ToolbarComponent,
    FormulaComponent,
    TableComponent,
    CellComponent,
    GetCharCodePipe,
    ResizeRowDirective,
    ResizeColDirective
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
