import { Component, OnInit } from '@angular/core';
import { Globals } from '../../../globals';
import { TranslateService } from '@ngx-translate/core';
import * as _ from 'underscore';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css'],
    providers: [Globals],
})
export class HeaderComponent implements OnInit {
    public isLoading = false;

    public menues = [
        { path: 'GitHubHome', displayName: 'GitHub' },
        { path: 'About', displayName: 'Sobre Mí' },
    ];

    constructor(public _translateService: TranslateService, public _globals: Globals) {
        this.isLoading = true;
    }

    ngOnInit() {
        // const aboutMenu = _.findWhere(this.menues, { path: 'About' });
        // aboutMenu.displayName = this._translateService.instant('about.title');
        this.isLoading = false;
    }

    public getLanguageName(lang: string) {
        return this._globals.languages.filter((x) => x.language === lang).pop().languageName;
    }
}
