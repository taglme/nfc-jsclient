export enum TagType {
    Unknown,
    Nfc,
    Barcode,
    Bluetooth,
}

export namespace TagType {
    export function toString(t: TagType): string {
        const names = ['unknown', 'nfc', 'barcode', 'bluetooth'];

        if (t < TagType.Nfc || t > TagType.Bluetooth) {
            return names[0];
        }
        return names[t];
    }

    export function parse(s: string): TagType {
        switch (s) {
            case TagType.toString(TagType.Nfc):
                return TagType.Nfc;
            case TagType.toString(TagType.Barcode):
                return TagType.Barcode;
            case TagType.toString(TagType.Bluetooth):
                return TagType.Bluetooth;
        }

        return TagType.Unknown;
    }
}

export interface TagResource {
    tag_id: string;
    kind: string;
    href: string;
    type: string;
    adapter_id: string;
    adapter_name: string;
    uid: string;
    atr: string;
    product: string;
    vendor: string;
}

export type TagShortResource = Exclude<
    TagResource,
    'tag_id' | 'kind' | 'href' | 'type' | 'adapter_id' | 'adapter_name' | 'uid'
>;
