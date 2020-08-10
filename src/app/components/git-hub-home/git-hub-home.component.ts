import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';

import { OrganizationsService } from '../../services/github/organizations.service';
import { RepositoriesService } from '../../services/github/repositories.service';
import { GenericService } from '../../services/common/generic.service';

import { GitOrganization } from '../models/git-organization.model';
import { GitRepository } from '../models/git-repository.model';
import { Organization } from '../models/organization.model';

import * as _ from 'underscore';
import { Dictionary } from 'underscore';

@Component({
    selector: 'app-git-hub-home',
    templateUrl: './git-hub-home.component.html',
    styleUrls: ['./git-hub-home.component.css'],
    providers: [],
})
export class GitHubHomeComponent implements OnInit {
    public isLoading: boolean;
    private userName = 'StefanoNotaro';
    public data = [];
    public dataGroupByOrganization: Dictionary<any[]>;
    public dataGroupedSanitized: Organization[] = [];
    public pageTranslations;

    constructor(
        private _gitOrganizatinosServices: OrganizationsService,
        private _gitRepositoriesServices: RepositoriesService,
        private _genericService: GenericService,
        public _translateService: TranslateService
    ) {
        this.isLoading = true;
    }

    ngOnInit() {
        forkJoin([this._gitOrganizatinosServices.getOrganizations(this.userName), this._gitRepositoriesServices.getRepositories(this.userName)]).subscribe((x) => {
            const gitOrgs = x[0] as GitOrganization[];
            const nonOrgRepos = x[1] as GitRepository[];
            gitOrgs.forEach((gitOrg) => {
                forkJoin([this._genericService.get(gitOrg.url), this._genericService.get(gitOrg.repos_url)]).subscribe((y) => {
                    const gitOrgData = y[0] as any;
                    const gitRepos = y[1] as GitRepository[];
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
    }

    public getOrganizations(organizations: Organization[]) {
        return organizations.filter((x) => x.organizationUrl !== '');
    }
}
