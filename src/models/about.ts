export interface AppInfoResource {
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
