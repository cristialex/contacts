import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  loading$ = new BehaviorSubject<boolean>(false);
  onLoading(flag: boolean) {
    this.loading$.next(flag);
  }
}
