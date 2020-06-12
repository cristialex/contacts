import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { IsUserAuthService } from '../shared/services/is-user-auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private isUserAuth: IsUserAuthService, private router: Router) {}

  canActivate(): boolean {
    if (
      this.isUserAuth.userInformation?.firstName &&
      this.isUserAuth.userInformation?.lastName
    ) {
      return true;
    }
    this.router.navigate(['/login']);
  }
}
