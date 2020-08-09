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
    constructor(public _translateService: TranslateService, _globals: Globals) {
        const languages = _globals.languages.map(x => x.language);
        _translateService.addLangs(languages);
        _translateService.setDefaultLang(languages[0]);
        const browserLanguage = _translateService.getBrowserLang();
        _translateService.use(browserLanguage.match(_globals.languagesRegex) ? browserLanguage : languages[0]);
    }
}
