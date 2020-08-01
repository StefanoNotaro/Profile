import { Component, OnInit } from '@angular/core';
import { TranslationsService } from '../../../services/translations/translations.service';
import { Globals } from '../../../globals';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css'],
    providers: [Globals],
})
export class HeaderComponent implements OnInit {
    public isLoading;
    private documentTranslation = 'Header';
    public pageTranslations;

    constructor(private _translationsService: TranslationsService, public _globals: Globals) {
        this.isLoading = true;
    }

    ngOnInit() {
        this._translationsService.getDocumentTranslations(this.documentTranslation).subscribe((x) => {
            this.pageTranslations = x;
            this.isLoading = false;
        });
    }

    public getTranslation(field: string): string {
        if (!this.pageTranslations) {
            return;
        }

        return this.pageTranslations[field][this._translationsService.getLanguage()];
    }

    public languageChange(event) {
        this._translationsService.changeLanguage(event.target.value);
    }
}
