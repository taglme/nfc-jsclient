import { AdapterResource, AdapterShortResource, AdapterType } from '../models/adapters';
import { IApi } from '../interfaces';

export class Adapter {
    href: string;
    name: string;
    type: AdapterType;
    driver?: string;
    kind: string;
    adapterId: string;

    constructor(a: AdapterResource | AdapterShortResource) {
        this.href = a.href;
        this.name = a.name;
        this.type = AdapterType.parse(a.type);
        this.kind = a.kind;
        this.adapterId = a.adapter_id;

        if ('driver' in a) {
            this.driver = a.driver;
        }
    }
}

export default class AdapterService {
    private readonly url: string;
    private api: IApi;
    private path = '/adapters';

    constructor(api: IApi, url: string) {
        this.url = url;
        this.api = api;
    }

    // Adapters list endpoint returns information about all adapters. The response includes array of Adapters
    getAll = (): Promise<Adapter[] | Error> => this.getFiltered();

    // Adapters list endpoint returns information about all adapters. The response includes array of Adapters
    // adapterType – Adapters' type filter.
    getFiltered = (adapterType?: AdapterType): Promise<Adapter[] | Error> => {
        const url = this.url + this.path + (adapterType ? '?type=' + AdapterType.toString(adapterType) : '');

        return this.api
            .call<AdapterShortResource[]>(({ get }) => get(url, {}))
            .then<Adapter[]>(resp => resp.map(a => new Adapter(a)))
            .catch((err: Error) => new Error('Error on adapters get filtered: ' + err.name + err.message));
    };

    // Get adapter with all details
    // adapterID – Unique identifier in form of UUID representing a specific adapter.
    get = (adapterID: string): Promise<Adapter | Error> => {
        const url = this.url + this.path + '/' + adapterID;

        return this.api
            .call<AdapterResource>(({ get }) => get(url, {}))
            .then<Adapter>(resp => new Adapter(resp))
            .catch((err: Error) => new Error('Error on adapter get: ' + err.name + err.message));
    };
}
