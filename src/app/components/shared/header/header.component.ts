import { Component, OnInit } from '@angular/core';
import { Globals } from '../../../globals';
import { TranslateService, TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css'],
    providers: [Globals],
})
export class HeaderComponent implements OnInit {
    public isLoading;

    public menues = [
        { path: 'GitHubHome', displayName: 'GitHhub' },
        { path: 'About', displayName: 'Sobre Mí' },
    ];

    constructor(public _translateService: TranslateService, public _globals: Globals) {
        this.isLoading = true;
    }

    ngOnInit() {
        this.isLoading = false;
    }

    public getLanguageName(lang: string) {
        return this._globals.languages.filter(x => x.language === lang).pop().languageName;
    }
}
