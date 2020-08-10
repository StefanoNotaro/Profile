import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './shared/modules/page-not-found/page-not-found.component';
import { GitHubHomeComponent } from './modules/git-hub-home/git-hub-home.component';
import { AboutComponent } from './modules/about/about.component';

const routes: Routes = [
    { path: 'GitHubHome', component: GitHubHomeComponent },
    { path: 'About', component: AboutComponent },
    { path: '404', component: PageNotFoundComponent },
    { path: '', pathMatch: 'full', redirectTo: 'GitHubHome' },
    { path: '**', pathMatch: 'full', redirectTo: '404' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
