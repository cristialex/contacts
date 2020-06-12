import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { EMAIL } from 'src/app/constants/regex.constants';
import { ContactsModel } from 'src/app/shared/model/contacts.model';
import { ContactsProfileService } from './contacts-profile.service';

@Component({
  selector: 'app-contacts-profile',
  templateUrl: './contacts-profile.component.html',
  styleUrls: ['./contacts-profile.component.scss'],
})
export class ContactsProfileComponent implements OnInit {
  contactProfileForm: FormGroup;
  private unsubscribe$ = new Subject();

  constructor(
    private contactsProfileService: ContactsProfileService,
    private fb: FormBuilder,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.contactProfileForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern(EMAIL)]],
    });
    this.contactsProfileService
      .getSelectedContact(1)
      .pipe(
        takeUntil(this.unsubscribe$),
        tap((response: ContactsModel) =>
          this.buildContactsProfileForm(response)
        )
      )
      .subscribe();
  }

  save() {
    this.contactsProfileService
      .editContact(this.contactProfileForm.value)
      .pipe(
        takeUntil(this.unsubscribe$),
        tap(() => {
          this.contactSnackBar();
          this.router.navigate(['/contacts']);
        })
      )
      .subscribe();
  }

  back() {
    this.router.navigate(['/contacts']);
  }

  private contactSnackBar() {
    this._snackBar.open('Successfully edited', '', {
      duration: 1500,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }

  private buildContactsProfileForm(form: ContactsModel) {
    this.contactProfileForm.patchValue({
      firstName: form.firstName,
      lastName: form.lastName,
      phoneNumber: form.phoneNumber,
      email: form.email,
    });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
