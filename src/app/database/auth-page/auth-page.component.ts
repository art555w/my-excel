import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AuthService} from "../services/auth.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {IUser} from "../../shared/interface";

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss']
})
export class AuthPageComponent implements OnInit {
  @Output()
  close = new EventEmitter<void>()
  form!: FormGroup
  submitted = false

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
    const user: IUser = {
      email: this.form.value.email,
      password: this.form.value.password,
    }

    this.authService.login(user).subscribe({
      next: () => {
        this.submitted = false
        this.close.emit()
      },
      error: () => {
        this.submitted = false
      }
    })
  }
}
