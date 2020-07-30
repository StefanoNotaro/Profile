import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class OrganizationsService {
  private baseUrl = 'https://api.github.com';

  constructor(private _htpp: HttpClient) {}

  public getOrganizations(userName: string) {
    const orgsUrl = `${this.baseUrl}/users/${userName}/orgs`;
    return this._htpp.get(orgsUrl);
  }
}
