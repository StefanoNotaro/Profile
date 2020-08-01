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
        });

        this._gitOrganizatinosServices.getOrganizations(this.userName).subscribe((gitOrgs: GitOrganization[]) => {
            this._gitRepositoriesServices.getRepositories(this.userName).subscribe((nonOrgRepos: GitRepository[]) => {
                gitOrgs.forEach((gitOrg) => {
                    this._genericService.get(gitOrg.url).subscribe((gitOrgData: any) => {
                        this._genericService.get(gitOrg.repos_url).subscribe((gitRepos: GitRepository[]) => {
                            this.dataGroupedSanitized.push({
                                organizationImage: gitOrgData.avatar_url,
                                organizationName: gitOrgData.name !== null ? gitOrgData.name : gitOrgData.login,
                                organizationUrl: gitOrgData.html_url,
                                repositories: gitRepos.map((rep) => {
                                    return {
                                        repositoryName: rep.name,
                                        repositoryUrl: rep.html_url,
                                        gitHubPage: rep.homepage,
                                        hasPages: rep.has_pages,
                                    };
                                }),
                            });

                            this.dataGroupedSanitized = _.sortBy(this.dataGroupedSanitized, 'organizationName');

                            this.isLoading = false;
                        });
                    });
                });
                this.dataGroupedSanitized.push({
                    organizationName: 'Not in Organization',
                    organizationImage: '',
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
