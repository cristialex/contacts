import { Injectable } from '@angular/core';
import { LoggedUserModel } from '../../modules/login/login-component/logged-user.model';

@Injectable({
  providedIn: 'root',
})
export class IsUserAuthService {
  userInformation: LoggedUserModel;

  constructor() {}

  setUserInformation(user: LoggedUserModel) {
    this.userInformation = user;
  }
}
