import Api from '../api';

interface AppInfoResource {
    name: string;
    version: string;
    commit: string;
    sdk_info: string;
    platform: string;
    build_time: string;
    check_success: boolean;
    suported: boolean;
    have_update: boolean;
    update_version: string;
    update_download: string;
    started_at: string;
}

class AppInfo {
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
    private api: Api;
    private path = '/about';

    constructor(api: Api, url: string) {
        this.url = url;
        this.api = api;
    }

    get = (): Promise<AppInfo> =>
        this.api
            .call<AppInfoResource>(({ get }) => get(this.url + this.path, {}))
            .then<AppInfo>(resp => new AppInfo(resp));
}
