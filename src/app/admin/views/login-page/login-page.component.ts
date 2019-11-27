import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../../shared/interfaces/user';

@Component({
  selector: 'bl-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  private form: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(3)]],
    });
  }

  public email() {
    return this.form.get('email');
  }

  public password() {
    return this.form.get('password');
  }

  onSubmit(): void {
    const { email, password } = this.form.value;
    if (this.form.valid) {
      const user: User = {
        email,
        password,
      };
      console.log(user);
    }
  }
}
