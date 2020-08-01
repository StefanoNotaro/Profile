export interface Organization {
    organizationImage: string;
    organizationName: string;
    organizationUrl: string;
    repositories: Repository[];
}

export interface Repository {
    repositoryName: string;
    repositoryUrl: string;
    gitHubPage: string;
    hasPages: boolean;
}
