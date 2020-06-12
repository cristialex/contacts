import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared-module/shared/shared.module';
import { ContactsProfileComponent } from './contacts-profile-component/contacts-profile.component';
import { ContactsProfileRoutingModule } from './contacts-profile-routing.module';

@NgModule({
  declarations: [ContactsProfileComponent],
  imports: [ContactsProfileRoutingModule, SharedModule],
})
export class ContactsProfileModule {}
