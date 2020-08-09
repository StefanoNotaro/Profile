import { Injectable } from '@angular/core';

@Injectable()
export class Globals {
    languages = [
        {language: 'es', languageName: 'Español'},
        {language: 'en', languageName: 'English'}
    ];
    languagesRegex = /es|en/;
}
