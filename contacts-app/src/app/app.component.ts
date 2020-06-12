import { ChangeDetectorRef, Component } from '@angular/core';
import { delay, startWith, tap } from 'rxjs/operators';
import { LoadingService } from './shared/services/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  loading = false;

  constructor(
    public loadingService: LoadingService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loadingService.loading$
      .pipe(
        startWith(null),
        delay(0),
        tap((response) => (this.loading = response))
      )
      .subscribe();
  }
}
