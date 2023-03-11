import {isDevMode, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {MatIconModule} from "@angular/material/icon";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {EffectsModule} from '@ngrx/effects';
import {AppEffects} from './store/effects/app.effects';
import {StoreModule} from '@ngrx/store';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {DashboardPageComponent} from './dashboard-page/dashboard-page.component';
import {TablePageComponent} from './table-page/table-page.component';
import {HeaderComponent} from './components/header/header.component';
import {ToolbarComponent} from './components/toolbar/toolbar.component';
import {FormulaComponent} from './components/formula/formula.component';
import {TableComponent} from './components/table/table.component';
import {GetFromCharCodePipe} from "./shared/pipes/get-from-char-code.pipe";
import {InitCellsDirective} from './shared/directives/init-cells.directive';
import {ResizeTableDirective} from './shared/resize-table/resize-table.directive';
import {SelectCellDirective} from './shared/select-cell/select-cell.directive';
import {MousedownTableDirective} from './shared/directives/mousedown-table.directive';
import {KeydownTableDirective} from './shared/directives/keydown-table.directive';
import {metaReducers, reducers} from './store/reducers';
import {CellComponent} from './shared/components/cell/cell.component';
import {ColComponent} from './shared/components/col/col.component';
import {GetTitleDirective} from './shared/directives/get-title.directive';
import {DatabaseModule} from "./database/database.module";
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";

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
    KeydownTableDirective,
    CellComponent,
    ColComponent,
    GetTitleDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    StoreModule.forRoot(reducers, {
      metaReducers
    }),
    StoreDevtoolsModule.instrument({maxAge: 25, logOnly: !isDevMode()}),
    EffectsModule.forRoot([AppEffects]),
    DatabaseModule,
    FormsModule,
    HttpClientModule,
    MatProgressSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
