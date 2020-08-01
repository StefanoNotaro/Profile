import { Component } from '@angular/core';
import { Globals } from './globals';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: [Globals],
})
export class AppComponent {
    title = 'Profile';
    constructor(private _globals: Globals) {
        localStorage.setItem(_globals.localStorageLanguageKey, _globals.languaje);
    }
}
