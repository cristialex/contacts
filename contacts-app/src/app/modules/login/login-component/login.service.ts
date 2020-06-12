import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoggedUserModel } from './logged-user.model';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private httpClient: HttpClient) {}

  login(email: string, password: string): Observable<LoggedUserModel> {
    return this.httpClient.post<LoggedUserModel>(
      `${environment.APP_ENDPOINT}/login`,
      { email, password }
    );
  }
}
