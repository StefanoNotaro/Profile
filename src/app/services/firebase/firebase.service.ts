import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class FirebaseService {
    constructor(private _firestore: AngularFirestore) {}

    get(collectionName: string) {
        let itemsCollection: AngularFirestoreCollection;
        let items: Observable<DocumentData[]>;
        itemsCollection = this._firestore.collection(collectionName);
        items = itemsCollection.valueChanges({ idField: 'id' });

        return items;
    }

    getTranslations() {
        return this.get('translation');
    }

    getDocumentTranslations(document: string) {
        let itemsCollection;
        let items: Observable<DocumentData[]>;
        itemsCollection = this._firestore.collection('translation').doc(document);
        items = itemsCollection.valueChanges({ idField: 'id' });

        return items;
    }
}
