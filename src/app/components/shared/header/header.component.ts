import { Component, OnInit } from '@angular/core';
import { TranslationsService } from '../../../services/translations/translations.service';
import { Globals } from '../../../globals';
import { FirebaseService } from '../../../services/firebase/firebase.service';
import { DocumentData } from '@angular/fire/firestore';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css'],
    providers: [Globals],
})
export class HeaderComponent implements OnInit {
    public isLoading;
    private documentTranslation = 'Header';
    private languajesDocumetns = 'languages';
    public languagesAvailables: DocumentData[];
    public pageTranslations;

    constructor(private _translationsService: TranslationsService, public _globals: Globals, private _firebaseServices: FirebaseService) {
        this.isLoading = true;
    }

    ngOnInit() {
        this._translationsService.getDocumentTranslations(this.documentTranslation).subscribe((x) => {
            this.pageTranslations = x;
            this.isLoading = false;
        });
        this._firebaseServices.get(this.languajesDocumetns).subscribe((l) => (this.languagesAvailables = l));
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
