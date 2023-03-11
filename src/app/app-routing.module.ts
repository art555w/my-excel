import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TablePageComponent} from "./table-page/table-page.component";
import {DashboardPageComponent} from "./dashboard-page/dashboard-page.component";

const routes: Routes = [
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  {path: 'dashboard', component: DashboardPageComponent},
  {path: 'table/:id', component: TablePageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
