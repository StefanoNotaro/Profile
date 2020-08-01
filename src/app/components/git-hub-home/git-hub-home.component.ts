import { Component, OnInit } from '@angular/core';
import { OrganizationsService } from '../../services/github/organizations.service';
import { GitOrganization } from '../models/git-organization.model';
import { GenericService } from '../../services/common/generic.service';
import { GitRepository } from '../models/git-repository.model';
import * as _ from 'underscore';
import { Dictionary } from 'underscore';
import { Organization, Repository } from '../models/organization.model';
import { RepositoriesService } from '../../services/github/repositories.service';
import { TranslationsService } from '../../services/translations/translations.service';
import { Globals } from '../../globals';

@Component({
    selector: 'app-git-hub-home',
    templateUrl: './git-hub-home.component.html',
    styleUrls: ['./git-hub-home.component.css'],
    providers: [Globals],
})
export class GitHubHomeComponent implements OnInit {
    public isLoading: boolean;
    private userName = 'StefanoNotaro';
    public data = [];
    public dataGroupByOrganization: Dictionary<any[]>;
    public dataGroupedSanitized: Organization[] = [];
    public pageTranslations;
    private documentTranslation = 'gitHubHome';

    constructor(
        private _gitOrganizatinosServices: OrganizationsService,
        private _gitRepositoriesServices: RepositoriesService,
        private _genericService: GenericService,
        private _translationsService: TranslationsService,
        public _globals: Globals
    ) {
        this.isLoading = true;
    }

    ngOnInit() {
        this._translationsService.getDocumentTranslations(this.documentTranslation).subscribe((x) => {
            this.pageTranslations = x;
            console.log(x);
        });

        this._gitOrganizatinosServices.getOrganizations(this.userName).subscribe((gitOrgs: GitOrganization[]) => {
            this._gitRepositoriesServices.getRepositories(this.userName).subscribe((nonOrgRepos: GitRepository[]) => {
                gitOrgs.forEach((gitOrg) => {
                    this._genericService.get(gitOrg.url).subscribe((gitOrgData: any) => {
                        this._genericService.get(gitOrg.repos_url).subscribe((gitRepos: GitRepository[]) => {
                            for (const gitRepo of gitRepos) {
                                this.data.push({
                                    organizationName: gitOrg.login,
                                    organizationUrl: gitOrgData.html_url,
                                    repositoryName: gitRepo.name,
                                    repositoryUrl: gitRepo.html_url,
                                    gitHubPage: gitRepo.homepage,
                                    hasPages: gitRepo.has_pages,
                                });
                            }

                            this.dataGroupByOrganization = _.groupBy(this.data, (g) => g.organizationName);

                            for (const key of Object.keys(this.dataGroupByOrganization)) {
                                const value = this.dataGroupByOrganization[key];
                                const repos: Repository[] = [];
                                let i = 0;
                                for (const rep of value) {
                                    i++;
                                    repos.push({
                                        repositoryName: rep.repositoryName,
                                        repositoryUrl: rep.repositoryUrl,
                                        gitHubPage: rep.gitHubPage,
                                        hasPages: rep.hasPages,
                                    });
                                }

                                this.dataGroupedSanitized.push({
                                    organizationName: key,
                                    organizationUrl: value[0].organizationUrl,
                                    repositories: repos,
                                });
                            }
                            this.dataGroupedSanitized.push({
                                organizationName: 'Not in Organization',
                                organizationUrl: '',
                                repositories: nonOrgRepos.map((r) => {
                                    return {
                                        gitHubPage: r.homepage,
                                        hasPages: r.has_pages,
                                        repositoryName: r.name,
                                        repositoryUrl: r.html_url,
                                    };
                                }),
                            });

                            this.isLoading = false;
                        });
                    });
                });
            });
        });
    }

    public getOrganizations(organizations: Organization[]) {
        return organizations.filter((x) => x.organizationUrl !== '');
    }

    public getTranslation(field: string): string {
        if (!this.pageTranslations) {
            return;
        }

        return this.pageTranslations[field][this._translationsService.getLanguage()];
    }
}
