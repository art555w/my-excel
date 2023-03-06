import {Component} from '@angular/core';
import {AuthService} from "../database/services/auth.service";

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent {
  auth = false

  constructor(public authService: AuthService) {
  }


}
