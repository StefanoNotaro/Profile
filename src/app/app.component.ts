import { Component } from '@angular/core';
import { Globals } from './globals';
import { TranslateService } from '@ngx-translate/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: [Globals],
})
export class AppComponent {
    title = 'Profile';
    // tslint:disable-next-line: variable-name
    constructor(public _translateService: TranslateService, _globals: Globals, public _router: Router) {
        const languages = _globals.languages.map(x => x.language);
        _translateService.addLangs(languages);
        _translateService.setDefaultLang(languages[0]);
        const browserLanguage = _translateService.getBrowserLang();
        _translateService.use(browserLanguage.match(_globals.languagesRegex) ? browserLanguage : languages[0]);

        // subscribe to router events and send page views to Google Analytics
        this._router.events.subscribe(event => {

            if (event instanceof NavigationEnd) {
                (window as any).ga('set', 'page', event.urlAfterRedirects);
                (window as any).ga('send', 'pageview');

            }

        });
    }
}
