import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DocumentData, AngularFirestore } from '@angular/fire/firestore';

@Injectable({
    providedIn: 'root',
})
export class TranslationsService {
    private collectionName = 'translation';
    constructor(private _firestore: AngularFirestore) {}

    getDocumentTranslations(document: string) {
        let itemsCollection;
        let items: Observable<DocumentData[]>;
        itemsCollection = this._firestore.collection(this.collectionName).doc(document);
        items = itemsCollection.valueChanges({ idField: 'id' });

        return items;
    }

    public getLanguage(): string {
        return localStorage.getItem('ProfilePageLanguage');
    }

    public changeLanguage(newLanguaje: string) {
        localStorage.setItem('ProfilePageLanguage', newLanguaje);
    }
}
