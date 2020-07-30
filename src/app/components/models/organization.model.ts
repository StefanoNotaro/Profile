export interface Organization {
  organizationName: string;
  organizationUrl: string;
  repositories: Repository[];
}

export interface Repository {
  repositoryName: string;
  repositoryUrl: string;
  gitHubPage: string;
}
