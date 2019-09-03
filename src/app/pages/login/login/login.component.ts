import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  show = true;
  loading = false;
  submitted = false;
  error = '';


  constructor(
    private auth: AuthenticationService,
    // private guard: AuthGuard,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {

    if (this.auth.isAuthenticated()) { this.router.navigate(['/students']); }
    this.loginForm = this.fb.group({
      uName: ['', [Validators.required, Validators.email]],
      pwd: ['', Validators.required]
    });

    // reset login status
    this.auth.logoutAdmin();
  }

  get f() { return this.loginForm.controls }

  login() {

    if (this.loginForm.invalid) {
      return;
    }
    this.loading = true;
    this.auth.login(this.f.uName.value, this.f.pwd.value);
    setTimeout(() => { this.loading = false }, 2500);
  }


  getErrorMessage(fControl) {
    // return fControl.hasError('required') ? 'This field is required' : '';
    if (fControl.errors.required) {
      return 'This field is required';
    }
  }
  getErrorMessageEmail(fControl) {
    // return fControl.hasError('required') ? 'This field is required' : '';
    if (fControl.errors.email) {

      return 'Enter a Valid Email';
    }
  }

}
