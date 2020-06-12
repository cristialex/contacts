import { NgModule } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { SharedModule } from 'src/app/shared-module/shared/shared.module';
import { ContactDialog } from './contact-dialog/contact.dialog';
import { ContactsComponent } from './contacts-component/contacts.component';
import { ContactsRoutingModule } from './contacts-routing.module';

@NgModule({
  declarations: [ContactsComponent, ContactDialog],
  imports: [
    ContactsRoutingModule,
    MatTableModule,
    MatCheckboxModule,
    MatDialogModule,
    SharedModule,
  ],
})
export class ContactsModule {}
