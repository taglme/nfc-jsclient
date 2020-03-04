import { TagResource, TagShortResource, TagType } from '../models/tags';
import { IApi } from '../interfaces';
import { str2ab } from '../helpers/byte';

export class Tag {
    tagID: string;
    type: TagType;
    adapterID: string;
    adapterName: string;
    uid: Uint8Array;
    atr: Uint8Array;
    product: string;
    vendor: string;

    constructor(r: TagResource | TagShortResource) {
        this.tagID = r.tag_id;
        this.type = TagType.parse(r.type);
        this.adapterID = r.adapter_id;
        this.adapterName = r.adapter_name;
        this.uid = str2ab(r.uid);
        this.atr = str2ab(r.atr);
        this.product = r.product;
        this.vendor = r.vendor;
    }
}

export class TagService {
    private readonly url: string;
    private api: IApi;
    private path = '/tags';
    private basePath = '/adapters';

    constructor(api: IApi, url: string) {
        this.url = url;
        this.api = api;
    }

    // Get all adapter's tags
    // adapterID – Unique identifier in form of UUID representing a specific adapter.
    // tagType – Tags' type filter.
    getAll = (adapterId: string, tagType?: TagType): Promise<Tag[]> => {
        const url =
            this.url +
            this.basePath +
            '/' +
            adapterId +
            this.path +
            (tagType ? '?type=' + TagType.toString(tagType) : '');

        return this.api
            .call<TagShortResource[]>(({ get }) => get(url, {}))
            .then<Tag[]>(resp => resp.map(a => new Tag(a)))
            .catch((err: Error) => {
                throw new Error('Error on tags get all: ' + JSON.stringify(err));
            });
    };

    // Get all specified tag's details in adapter
    // adapterID – Unique identifier in form of UUID representing a specific adapter.
    // tagID – Unique identifier in form of UUID representing a specific tag.
    get = (adapterId: string, tagId: string): Promise<Tag> => {
        const url = this.url + this.basePath + '/' + adapterId + this.path + '/' + tagId;

        return this.api
            .call<TagResource>(({ get }) => get(url, {}))
            .then<Tag>(resp => new Tag(resp))
            .catch((err: Error) => {
                throw new Error('Error on tags get: ' + JSON.stringify(err));
            });
    };
}
