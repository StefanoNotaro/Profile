import { Component, OnInit } from '@angular/core';
import { TranslationsService } from '../../../services/translations/translations.service';
import { Globals } from '../../../globals';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.css'],
    providers: [Globals],
})
export class FooterComponent implements OnInit {
    private documentTranslation = 'footer';
    public pageTranslations;

    public copyRightYear = new Date().getFullYear();
    public gitHubUrl = 'https://github.com/StefanoNotaro';
    public contactMail = 'stefano.notaro@gmail.com';
    public links = [
        {
            displayName: 'Linkedin',
            url: 'https://www.linkedin.com/in/stefano-notaro-francesco-gauthier/',
            icon: 'fa-linkedin-in',
        },
        {
            displayName: 'GitHub',
            url: this.gitHubUrl,
            icon: 'fa-github',
        },
    ];

    constructor(private _translationsService: TranslationsService, public _globals: Globals) {}

    ngOnInit() {
        this._translationsService.getDocumentTranslations(this.documentTranslation).subscribe((x) => {
            this.pageTranslations = x;
        });
    }

    public getTranslation(field: string): string {
        if (!this.pageTranslations) {
            return;
        }

        return this.pageTranslations[field][this._translationsService.getLanguage()];
    }
}
