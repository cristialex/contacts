import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { EMAIL } from 'src/app/constants/regex.constants';
import { ContactsComponent } from '../contacts-component/contacts.component';

@Component({
  selector: 'dialog-contact',
  templateUrl: 'contact.dialog.html',
  styleUrls: ['./contact.dialog.scss'],
})
export class ContactDialog {
  contactForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ContactsComponent>
  ) {}

  ngOnInit() {
    this.contactForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern(EMAIL)]],
    });
  }
}
