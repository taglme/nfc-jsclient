export interface NdefRecordPayloadRawResource {
    tnf: number;
    type: string;
    id: string;
    payload: string;
}

export interface NdefRecordPayloadTextResource {
    text: string;
    lang: string;
}

export interface NdefRecordPayloadTextResource {
    text: string;
    lang: string;
}

export interface NdefRecordPayloadUrlResource {
    url: string;
}

export interface NdefRecordPayloadUriResource {
    uri: string;
}

export interface NdefRecordPayloadVcardResource {
    address_city: string;
    address_country: string;
    address_postal_code: string;
    address_region: string;
    address_street: string;
    email: string;
    first_name: string;
    last_name: string;
    organization: string;
    phone_cell: string;
    phone_home: string;
    phone_work: string;
    title: string;
    site: string;
}

export interface NdefRecordPayloadMimeResource {
    type: string;
    format: string;
    content: string;
}

export interface NdefRecordPayloadPhoneResource {
    phone_number: string;
}

export interface NdefRecordPayloadGeoResource {
    latitude: string;
    longitude: string;
}

export interface NdefRecordPayloadAarResource {
    package_name: string;
}

export interface NdefRecordPayloadPosterResource {
    title: string;
    uri: string;
}

export enum NdefRecordPayloadType {
    Unknown,
    Raw,
    Url,
    Text,
    Uri,
    Vcard,
    Mime,
    Phone,
    Geo,
    Aar,
    Poster,
}

export enum NdefRecordPayloadTypeString {
    Unknown = 'unknown',
    Raw = 'raw',
    Url = 'url',
    Text = 'text',
    Uri = 'uri',
    Vcard = 'vcard',
    Mime = 'mime',
    Phone = 'phone',
    Geo = 'geo',
    Aar = 'aar',
    Poster = 'poster',
}

export namespace NdefRecordPayloadType {
    export function toString(c: NdefRecordPayloadType): string {
        const names = [
            NdefRecordPayloadTypeString.Unknown,
            NdefRecordPayloadTypeString.Raw,
            NdefRecordPayloadTypeString.Url,
            NdefRecordPayloadTypeString.Text,
            NdefRecordPayloadTypeString.Uri,
            NdefRecordPayloadTypeString.Vcard,
            NdefRecordPayloadTypeString.Mime,
            NdefRecordPayloadTypeString.Phone,
            NdefRecordPayloadTypeString.Geo,
            NdefRecordPayloadTypeString.Aar,
            NdefRecordPayloadTypeString.Poster,
        ];

        if (c < NdefRecordPayloadType.Raw || c > NdefRecordPayloadType.Phone) {
            return names[0];
        }
        return names[c];
    }

    export function parse(s: string): NdefRecordPayloadType {
        switch (s) {
            case NdefRecordPayloadTypeString.Raw:
                return NdefRecordPayloadType.Raw;
            case NdefRecordPayloadTypeString.Url:
                return NdefRecordPayloadType.Url;
            case NdefRecordPayloadTypeString.Text:
                return NdefRecordPayloadType.Text;
            case NdefRecordPayloadTypeString.Uri:
                return NdefRecordPayloadType.Uri;
            case NdefRecordPayloadTypeString.Vcard:
                return NdefRecordPayloadType.Vcard;
            case NdefRecordPayloadTypeString.Mime:
                return NdefRecordPayloadType.Mime;
            case NdefRecordPayloadTypeString.Phone:
                return NdefRecordPayloadType.Phone;
            case NdefRecordPayloadTypeString.Geo:
                return NdefRecordPayloadType.Geo;
            case NdefRecordPayloadTypeString.Aar:
                return NdefRecordPayloadType.Aar;
            case NdefRecordPayloadTypeString.Poster:
                return NdefRecordPayloadType.Poster;
        }

        return NdefRecordPayloadType.Unknown;
    }
}

export type NdefRecordPayloadResourceMap = {
    [NdefRecordPayloadTypeString.Raw]: NdefRecordPayloadRawResource;
    [NdefRecordPayloadTypeString.Url]: NdefRecordPayloadUrlResource;
    [NdefRecordPayloadTypeString.Text]: NdefRecordPayloadTextResource;
    [NdefRecordPayloadTypeString.Vcard]: NdefRecordPayloadVcardResource;
    [NdefRecordPayloadTypeString.Mime]: NdefRecordPayloadMimeResource;
    [NdefRecordPayloadTypeString.Uri]: NdefRecordPayloadUriResource;
    [NdefRecordPayloadTypeString.Phone]: NdefRecordPayloadPhoneResource;
    [NdefRecordPayloadTypeString.Geo]: NdefRecordPayloadGeoResource;
    [NdefRecordPayloadTypeString.Aar]: NdefRecordPayloadAarResource;
    [NdefRecordPayloadTypeString.Poster]: NdefRecordPayloadPosterResource;
};

export type NdefRecordResource =
    | {
          type: NdefRecordPayloadTypeString.Raw;
          data: NdefRecordPayloadRawResource;
      }
    | {
          type: NdefRecordPayloadTypeString.Url;
          data: NdefRecordPayloadUrlResource;
      }
    | {
          type: NdefRecordPayloadTypeString.Text;
          data: NdefRecordPayloadTextResource;
      }
    | {
          type: NdefRecordPayloadTypeString.Vcard;
          data: NdefRecordPayloadVcardResource;
      }
    | {
          type: NdefRecordPayloadTypeString.Mime;
          data: NdefRecordPayloadMimeResource;
      }
    | {
          type: NdefRecordPayloadTypeString.Uri;
          data: NdefRecordPayloadUriResource;
      }
    | {
          type: NdefRecordPayloadTypeString.Phone;
          data: NdefRecordPayloadPhoneResource;
      }
    | {
          type: NdefRecordPayloadTypeString.Geo;
          data: NdefRecordPayloadGeoResource;
      }
    | {
          type: NdefRecordPayloadTypeString.Aar;
          data: NdefRecordPayloadAarResource;
      }
    | {
          type: NdefRecordPayloadTypeString.Poster;
          data: NdefRecordPayloadPosterResource;
      };

export interface NdefResource {
    read_only: boolean;
    message: NdefRecordResource[];
}
