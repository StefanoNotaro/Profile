import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { GitHubHomeComponent } from './components/git-hub-home/git-hub-home.component';
import { PageNotFoundComponent } from './components/shared/page-not-found/page-not-found.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from '../environments/environment';

@NgModule({
    declarations: [AppComponent, HeaderComponent, FooterComponent, GitHubHomeComponent, PageNotFoundComponent],
    imports: [BrowserModule, AppRoutingModule, HttpClientModule, MDBBootstrapModule.forRoot(), BrowserAnimationsModule, AngularFireModule.initializeApp(environment.firebaseConfig, 'Profile'), AngularFirestoreModule, AngularFireDatabaseModule],
    providers: [],
    bootstrap: [AppComponent],
    schemas: [NO_ERRORS_SCHEMA],
})
export class AppModule {}
