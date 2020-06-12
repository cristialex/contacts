import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { ContactsModel } from '../../../shared/model/contacts.model';
import { ContactDialog } from '../contact-dialog/contact.dialog';
import { ContactsService } from './contacts.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss'],
})
export class ContactsComponent implements OnInit, OnDestroy {
  contacts: ContactsModel[] = [];
  contactsColumns: string[] = [
    'select',
    'firstName',
    'lastName',
    'phoneNumber',
    'email',
  ];
  selection = new SelectionModel<ContactsModel>(true, []);

  private unsubscribe$ = new Subject();

  constructor(
    private contactsService: ContactsService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit() {
    this.getContacts();
  }

  editContact() {
    this.router.navigate([
      `/contacts-profile/${this.selection.selected[0].id}`,
    ]);
  }

  addContact() {
    const dialogRef = this.dialog.open(ContactDialog);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.contacts = this.contacts.concat([result]);
        this.setLoginSnackBar('User added');
      }
    });
  }

  removeContacts() {
    this.selection.selected.forEach((item) => {
      this.contacts = this.contacts.filter((contact) => item.id !== contact.id);
    });

    this.selection.clear();
    this.setLoginSnackBar('Removed');
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.contacts.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.contacts.forEach((row) => this.selection.select(row));
  }

  private getContacts() {
    this.contactsService
      .getContacts()
      .pipe(
        takeUntil(this.unsubscribe$),
        tap((response: ContactsModel[]) => (this.contacts = response))
      )
      .subscribe();
  }

  private setLoginSnackBar(message: string) {
    this._snackBar.open(message, '', {
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
