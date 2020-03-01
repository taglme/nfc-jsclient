import { TagResource, TagType } from './types';

export class Tag {
    tagID: string;
    type: TagType;
    adapterID: string;
    adapterName: string;
    uid: any;
    atr: any;
    product: string;
    vendor: string;

    constructor(r: TagResource) {
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
