import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LoadingComponent } from './loading/loading.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { RouterModule } from '@angular/router';

const components = [PageNotFoundComponent, HeaderComponent, FooterComponent, LoadingComponent];

@NgModule({
    declarations: [components, LoadingComponent],
    imports: [CommonModule, NgxSpinnerModule, RouterModule],
    exports: [components],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SharedModule {}
