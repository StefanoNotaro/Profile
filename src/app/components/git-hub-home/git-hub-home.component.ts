import { Component, OnInit } from '@angular/core';
import { OrganizationsService } from '../../services/github/organizations.service';
import { GitOrganization } from '../models/git-organization.model';
import { GenericService } from '../../services/common/generic.service';
import { GitRepository } from '../models/git-repository.model';
import * as _ from 'underscore';
import { Dictionary } from 'underscore';
import { Organization, Repository } from '../models/organization.model';

@Component({
  selector: 'app-git-hub-home',
  templateUrl: './git-hub-home.component.html',
  styleUrls: ['./git-hub-home.component.css'],
})
export class GitHubHomeComponent implements OnInit {
  public data = [];
  public dataGroupByOrganization: Dictionary<any[]>;
  public dataGroupedSanitized: Organization[] = [];
  constructor(private _gitOrganizatinosServices: OrganizationsService, private _genericService: GenericService) {}

  ngOnInit() {
    this._gitOrganizatinosServices.getOrganizations('StefanoNotaro').subscribe((gitOrgs: GitOrganization[]) => {
      gitOrgs.forEach((gitOrg) => {
        this._genericService.get(gitOrg.repos_url).subscribe((gitRepos: GitRepository[]) => {
          for (const gitRepo of gitRepos) {
            this.data.push({
              organizationName: gitOrg.login,
              organizationUrl: this._genericService.getOrganizationUrl(gitOrg.login),
              repositoryName: gitRepo.name,
              repositoryUrl: this._genericService.getRepositoryUrl(gitRepo.name, gitOrg.login),
              gitHubPage: this._genericService.getGitHubPagedUrl(gitOrg.login, gitRepo.name),
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
              });
              //   console.log(this._genericService.urlExists(rep.gitHubPage));
            }

            this.dataGroupedSanitized.push({
              organizationName: key,
              organizationUrl: value[0].organizationUrl,
              repositories: repos,
            });
          }
        });
      });
    });
  }
}
