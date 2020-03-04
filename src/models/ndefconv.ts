import { CommandString } from './commands';

export interface RecordChunk {
    MB: boolean; // Message begin
    ME: boolean; // Message end
    CF: boolean; // Chunk Flag
    SR: boolean; // Short record
    IL: boolean; // ID length field present
    TNF: number; // Type name format (3 bits)
    TypeLength: number; // Type Length
    IDLength: number; // Length of the ID field
    PayloadLength: number; // Length of the Payload.
    Type: string; // Type of the payload. Must follow TNF
    ID: string; // An URI (per RFC 3986)
    Payload: ArrayBuffer; // Payload
}

export interface Record {
    chunks: RecordChunk[];
}

export type NdefRecordPayloadResource = {
    tnf?: number;
    type?: string;
    id?: string;
    payload?: string;
    url?: string;
};

export interface NdefRecordPayloadRawResource {
    tnf: number;
    type: string;
    id: string;
    payload: string;
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
            case CommandString.TransmitAdapter:
                return NdefRecordPayloadType.Url;
            case CommandString.TransmitTag:
                return NdefRecordPayloadType.Text;
            case CommandString.WriteNdef:
                return NdefRecordPayloadType.Uri;
            case CommandString.ReadNdef:
                return NdefRecordPayloadType.Vcard;
            case CommandString.FormatDefault:
                return NdefRecordPayloadType.Mime;
            case CommandString.LockPermanent:
                return NdefRecordPayloadType.Phone;
            case CommandString.SetPassword:
                return NdefRecordPayloadType.Geo;
            case CommandString.RemovePassword:
                return NdefRecordPayloadType.Aar;
            case CommandString.AuthPassword:
                return NdefRecordPayloadType.Poster;
        }

        return NdefRecordPayloadType.Unknown;
    }
}

export interface NdefRecordResource {
    type: string;
    data: NdefRecordPayloadResource;
}

export interface NdefResource {
    read_only: boolean;
    message: NdefRecordResource[];
}
