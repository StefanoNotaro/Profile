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
