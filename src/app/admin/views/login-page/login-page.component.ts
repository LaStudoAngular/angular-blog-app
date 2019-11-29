import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../../shared/interfaces';
import { AuthService } from '../../../shared/services/auth.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'bl-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  private form: FormGroup;
  public submitted = false;
  public message = '';

  constructor(
    private fb: FormBuilder,
    public authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      if (params.loginAgain) {
        this.message = 'Login again, please';
      }
    });
    this.form = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(3)]],
    });
  }

  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }

  onSubmit(): void {
    const { email, password } = this.form.value;
    this.submitted = true;

    if (this.form.valid) {
      const user: User = {
        email,
        password,
      };
      this.authService.login(user).subscribe(
        () => {
          this.form.reset();
          this.router.navigate(['/admin', 'dashboard']);
          this.submitted = false;
        },
        error => (this.submitted = false),
      );
    }
  }
}
