import { Component, OnInit } from '@angular/core';
import { TranslationsService } from '../../../services/translations/translations.service';
import { Globals } from '../../../globals';
import { FirebaseService } from '../../../services/firebase/firebase.service';
import { DocumentData } from '@angular/fire/firestore';
import { TranslateService, TranslateModule } from '@ngx-translate/core';

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

    constructor(public _translateService: TranslateService) {
        this.isLoading = true;
    }

    ngOnInit() {
        this.isLoading = false;
    }
}
