import { Injectable } from '@angular/core';

@Injectable()
export class Globals {
    languaje = 'en';
    localStorageLanguageKey = 'ProfilePageLanguage';
    languages = [ 'en', 'es' ];
    languagesRegex = /en|es/;
}
