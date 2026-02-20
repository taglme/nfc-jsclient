import { IApi } from '../interfaces';
import {
    ApplicationLicenseResource,
    LicenseMIDResource,
    LicenseResource,
    type AppClassPolicyResource,
    type HostPolicyResource,
    type TokenPolicyResource,
    type JobCapabilitiesResource,
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
    // features is kept for backward compatibility with older schema.
    // Prefer plugins.
    features: string[];
    plugins: string[];
    id: string;
    owner: string;
    email: string;
    machine: string;
    type: string;
    hostTier: string;
    applications: ApplicationLicense[];

    active?: boolean;
    revokedAppKeyIDs?: string[];
    appClassPolicies?: Record<string, AppClassPolicyResource>;
    policies?: Record<string, HostPolicyResource>;
    jobPolicies?: Record<string, JobCapabilitiesResource>;
    tokenPolicy?: TokenPolicyResource;

    constructor(r: LicenseResource) {
        this.start = r.start;
        this.end = r.end;
        this.support = r.support;
        this.plugins = r.plugins || r.features || [];
        this.features = r.features || [];
        this.id = r.id;
        this.owner = r.owner;
        this.email = r.email;
        this.machine = r.machine;
        this.type = r.type;
        this.hostTier = r.host_tier;
        this.applications = (r.applications || []).map(a => new ApplicationLicense(a));

        this.active = (r as any).active;
        this.revokedAppKeyIDs = (r as any).revoked_app_key_ids || [];
        this.appClassPolicies = (r as any).app_class_policies;
        this.policies = (r as any).policies;
        this.jobPolicies = (r as any).job_policies;
        this.tokenPolicy = (r as any).token_policy;
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

    // GetAccess returns the currently effective (active) license.
    // Resolution priority is server-defined (X-User-Token > service token > offline license).
    getAccess = (opts?: { xUserToken?: string; xAppKey?: string }): Promise<License> => {
        const headers: Record<string, string> = {};
        if (opts?.xAppKey) headers['X-App-Key'] = String(opts.xAppKey);
        if (opts?.xUserToken) headers['X-User-Token'] = String(opts.xUserToken);

        return this.api
            .call<LicenseResource>(({ get }) =>
                get(this.url + this.basePath + '/access', Object.keys(headers).length ? { headers } : {}),
            )
            .then<License>(resp => new License(resp))
            .catch((err: Error) => {
                throw new Error('Error on license get access: ' + JSON.stringify(err));
            });
    };
}
