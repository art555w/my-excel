import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

import {AuthService} from "../services/auth.service";
import {IUser} from "../../shared/interface";

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss']
})
export class AuthPageComponent implements OnInit {
  form!: FormGroup
  submitted = false
  reg = false

  constructor(public authService: AuthService) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    })
    this.authService.error$.subscribe((m) => console.log(m))
  }

  submit() {
    this.submitted = true
    if (!this.reg) {
      const user: IUser = {
        email: this.form.value.email,
        password: this.form.value.password,
      }

      this.authService.login(user).subscribe({
        next: () => {
          this.submitted = false
          location.reload()
        },
        error: () => {
          this.submitted = false
        }
      })
    } else {
      const user: IUser = {
        email: this.form.value.email,
        password: this.form.value.password,
      }

      this.authService.registration(user).subscribe({
        next: () => {
          this.submitted = false
          this.reg = false
          location.reload()
        },
        error: () => {
          this.submitted = false
        }
      })
    }

  }
}
