import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class GenericService {
  constructor(private _http: HttpClient) {}

  public get(url: string) {
    return this._http.get(url);
  }

  public getGitHubPagedUrl(organizationName: string, repositoryName: string) {
    return `https://${organizationName}.github.io/${repositoryName}`;
  }

  public getOrganizationUrl(organizationName: string) {
    return `https://github.com/${organizationName}`;
  }

  public getRepositoryUrl(repositoryName: string, organizationName: string = null, userName: string = null) {
    if (organizationName != null) {
      return `https://github.com/${organizationName}/${repositoryName}`;
    }

    return `https://github.com/${userName}/${repositoryName}`;
  }

  public urlExists(url: string) {
    this._http.get(url).subscribe(
      (success) => {
        console.log(success);
        return true;
      },
      (error) => {
        console.log(error);
        return false;
      }
    );
  }
}
