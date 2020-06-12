import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { LoadingService } from './loading.service';

@Injectable({
  providedIn: 'root',
})
export class HttpInterceptorService implements HttpInterceptor {
  constructor(
    private _snackBar: MatSnackBar,
    private loadingService: LoadingService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.loadingService.onLoading(true);
    return next.handle(request).pipe(
      finalize(() => this.loadingService.onLoading(false)),
      catchError((error: HttpErrorResponse) => {
        this._snackBar.open('Please try again!', 'Error', {
          duration: 1500,
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });
        return throwError(error);
      })
    );
  }
}
