import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GitHubHomeComponent } from './components/git-hub-home/git-hub-home.component';
import { PageNotFoundComponent } from './components/shared/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: 'GitHubHome', component: GitHubHomeComponent },
  { path: '404', component: PageNotFoundComponent },
  { path: '', pathMatch: 'full', redirectTo: 'GitHubHome' },
  { path: '**', pathMatch: 'full', redirectTo: '404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
