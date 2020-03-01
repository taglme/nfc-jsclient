import { TagResource, TagShortResource, TagType } from './types';
import Api from '../../api';

export class Tag {
    tagID: string;
    type: TagType;
    adapterID: string;
    adapterName: string;
    uid: any;
    atr: any;
    product: string;
    vendor: string;

    constructor(r: TagResource | TagShortResource) {
        this.tagID = r.tag_id;
        this.type = TagType.parse(r.type);
        this.adapterID = r.adapter_id;
        this.adapterName = r.adapter_name;
        this.uid = r.uid; // TODO: deal with []byte
        this.atr = r.atr; // TODO: deal with []byte
        this.product = r.product;
        this.vendor = r.vendor;
    }
}

export class TagService {
    private readonly url: string;
    private api: Api;
    private path = '/tags';
    private basePath = '/adapters';

    constructor(api: Api, url: string) {
        this.url = url;
        this.api = api;
    }

    getAll = (adapterId: string, tagType?: TagType): Promise<Tag[]> => {
        const url = this.url + this.path + tagType ? '?type=' + TagType.toString(tagType) : '';

        return this.api
            .call<TagShortResource[]>(({ get }) => get(url, {}))
            .then<Tag[]>(resp => resp.map(a => new Tag(a)));
    };

    get = (adapterId: string, tagId: string): Promise<Tag> => {
        const url = this.url + this.path + '/' + tagId;

        return this.api
            .call<TagResource>(({ get }) => get(url, {}))
            .then<Tag>(resp => new Tag(resp));
    };
}
