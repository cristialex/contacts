import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactsProfileComponent } from './contacts-profile-component/contacts-profile.component';

const routes: Routes = [{ path: '', component: ContactsProfileComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContactsProfileRoutingModule {}
