import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxSpinnerModule } from 'ngx-spinner';
import { RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './modules/page-not-found/page-not-found.component';
import { HeaderComponent } from './modules/header/header.component';
import { FooterComponent } from './modules/footer/footer.component';
import { LoadingComponent } from './modules/loading/loading.component';

const components = [PageNotFoundComponent, HeaderComponent, FooterComponent, LoadingComponent];

@NgModule({
    declarations: [components, LoadingComponent],
    imports: [CommonModule, NgxSpinnerModule, RouterModule],
    exports: [components],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SharedModule {}
