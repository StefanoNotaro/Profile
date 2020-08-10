import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class RepositoriesService {
    private baseUrl = 'https://api.github.com';

    constructor(private _http: HttpClient) {}

    public getRepositories(userName: string) {
        const reposUrl = `${this.baseUrl}/users/${userName}/repos`;
        return this._http.get(reposUrl);
    }
}
