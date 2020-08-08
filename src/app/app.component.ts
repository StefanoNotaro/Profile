import { Component } from '@angular/core';
import { Globals } from './globals';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: [Globals],
})
export class AppComponent {
    title = 'Profile';
    constructor(public _translateService: TranslateService, private _globals: Globals) {
        localStorage.setItem(_globals.localStorageLanguageKey, _globals.languaje);
        
        _translateService.addLangs(_globals.languages);
        _translateService.setDefaultLang(_globals.languages[0]);
        const browserLanguage = _translateService.getBrowserLang();
        _translateService.use(browserLanguage.match(_globals.languagesRegex) ? browserLanguage : _globals.languages[0]);
    }
}
