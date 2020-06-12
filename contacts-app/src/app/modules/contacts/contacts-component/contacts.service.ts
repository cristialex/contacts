import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ContactsModel } from '../../../shared/model/contacts.model';

@Injectable({
  providedIn: 'root',
})
export class ContactsService {
  constructor(private httpClient: HttpClient) {}

  getContacts(): Observable<ContactsModel[]> {
    return this.httpClient.get<ContactsModel[]>(
      `${environment.APP_ENDPOINT}/contacts`
    );
  }
}
