import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from "@angular/common/http";
import {ReactiveFormsModule} from "@angular/forms";
import {MatIconModule} from "@angular/material/icon";

import {AuthPageComponent} from './auth-page/auth-page.component';


@NgModule({
  declarations: [
    AuthPageComponent
  ],
  exports: [
    AuthPageComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatIconModule,
  ]
})
export class DatabaseModule {
}
