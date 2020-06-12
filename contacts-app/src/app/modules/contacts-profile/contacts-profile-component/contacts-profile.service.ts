import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ContactsModel } from 'src/app/shared/model/contacts.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ContactsProfileService {
  constructor(private httpClient: HttpClient) {}

  getSelectedContact(id: number): Observable<ContactsModel> {
    return this.httpClient.get<ContactsModel>(
      `${environment.APP_ENDPOINT}/contact/${id}`
    );
  }

  editContact(contact: ContactsModel): Observable<ContactsModel> {
    return this.httpClient.put<ContactsModel>(
      `${environment.APP_ENDPOINT}/editcontact`,
      { contact }
    );
  }
}
