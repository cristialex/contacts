import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { EMAIL } from 'src/app/constants/regex.constants';
import { IsUserAuthService } from 'src/app/shared/services/is-user-auth.service';
import { LoggedUserModel } from './logged-user.model';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;

  private unsubscribe$ = new Subject();

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    private _snackBar: MatSnackBar,
    private isUserAuthService: IsUserAuthService
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(EMAIL)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  onLogin() {
    this.loginService
      .login(this.loginForm?.value?.email, this.loginForm?.value?.password)
      .pipe(
        takeUntil(this.unsubscribe$),
        tap((response: LoggedUserModel) => {
          this.isUserAuthService.setUserInformation(response);
          this.setLoginSnackBar();
          this.router.navigate(['/contacts']);
        })
      )
      .subscribe();
  }

  private setLoginSnackBar() {
    this._snackBar.open('Login success', '', {
      duration: 1500,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
