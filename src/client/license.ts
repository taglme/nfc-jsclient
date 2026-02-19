import { IApi } from '../interfaces';
import {
    ApplicationLicenseResource,
    LicenseAccessResource,
    LicenseMIDResource,
    LicenseResource,
} from '../models/license';

export class ApplicationLicense {
    id: string;
    name: string;
    type: string;
    start: string;
    end: string;
    support: string;

    constructor(r: ApplicationLicenseResource) {
        this.id = r.id;
        this.name = r.name;
        this.type = r.type;
        this.start = r.start;
        this.end = r.end;
        this.support = r.support;
    }
}

export class License {
    start: string;
    end: string;
    support: string;
    features: string[];
    id: string;
    owner: string;
    email: string;
    machine: string;
    type: string;
    hostTier: string;
    applications: ApplicationLicense[];

    constructor(r: LicenseResource) {
        this.start = r.start;
        this.end = r.end;
        this.support = r.support;
        this.features = r.features || [];
        this.id = r.id;
        this.owner = r.owner;
        this.email = r.email;
        this.machine = r.machine;
        this.type = r.type;
        this.hostTier = r.host_tier;
        this.applications = (r.applications || []).map(a => new ApplicationLicense(a));
    }
}

export default class LicenseService {
    private readonly url: string;
    private api: IApi;
    private basePath = '/licenses';
    private appsPath = '/apps';

    constructor(api: IApi, url: string) {
        this.url = url;
        this.api = api;
    }

    // Get license with all details
    get = (): Promise<License> =>
        this.api
            .call<LicenseResource>(({ get }) => get(this.url + this.basePath, {}))
            .then<License>(resp => new License(resp))
            .catch((err: Error) => {
                throw new Error('Error on license get: ' + JSON.stringify(err));
            });

    // Get license for specific application with all details
    getApp = (appId: string): Promise<ApplicationLicense> => {
        const url = this.url + this.basePath + this.appsPath + '/' + appId;
        return this.api
            .call<ApplicationLicenseResource>(({ get }) => get(url, {}))
            .then<ApplicationLicense>(resp => new ApplicationLicense(resp))
            .catch((err: Error) => {
                throw new Error('Error on license get app: ' + JSON.stringify(err));
            });
    };

    // GetMID returns current host machine id (MID) as reported by the API.
    getMID = (): Promise<string> =>
        this.api
            .call<LicenseMIDResource>(({ get }) => get(this.url + this.basePath + '/mid', {}))
            .then<string>(resp => resp.mid)
            .catch((err: Error) => {
                throw new Error('Error on license get MID: ' + JSON.stringify(err));
            });

    // GetAccess returns the host tier and allowed scopes for the current host.
    getAccess = (): Promise<LicenseAccessResource> =>
        this.api
            .call<LicenseAccessResource>(({ get }) => get(this.url + this.basePath + '/access', {}))
            .catch((err: Error) => {
                throw new Error('Error on license get access: ' + JSON.stringify(err));
            });
}
