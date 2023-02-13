import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TablePageComponent} from "./table-page/table-page.component";
import {DashboardPageComponent} from "./dashboard-page/dashboard-page.component";

const routes: Routes = [
  {path: '', redirectTo: '/table', pathMatch: 'full'},
  {path: 'table', component: TablePageComponent},
  {path: 'dashboard', component: DashboardPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
