import { AppInfoResource } from '../models/about';
import { IApi } from '../interfaces';

export class AppInfo {
    name: string;
    version: string;
    commit: string;
    sdkInfo: string;
    platform: string;
    buildTime: string;
    checkSuccess: boolean;
    supported: boolean;
    haveUpdate: boolean;
    updateDownload: string;
    updateVersion: string;
    startedAt: string;

    constructor(a: AppInfoResource) {
        this.name = a.name;
        this.version = a.version;
        this.commit = a.commit;
        this.sdkInfo = a.sdk_info;
        this.platform = a.platform;
        this.buildTime = a.build_time;
        this.checkSuccess = a.check_success;
        this.supported = a.suported;
        this.haveUpdate = a.have_update;
        this.updateDownload = a.update_download;
        this.updateVersion = a.update_version;
        this.startedAt = a.started_at;
    }
}

export default class AboutService {
    private readonly url: string;
    private api: IApi;
    private path = '/about';

    constructor(api: IApi, url: string) {
        this.url = url;
        this.api = api;
    }

    // Get fetching the about info
    get = (): Promise<AppInfo> =>
        this.api
            .call<AppInfoResource>(({ get }) => get(this.url + this.path, {}))
            .then<AppInfo>(resp => new AppInfo(resp))
            .catch((err: Error) => {
                throw new Error('Error on about get: ' + JSON.stringify(err));
            });
}
