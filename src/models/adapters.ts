export enum AdapterType {
    Unknown,
    Nfc,
    Barcode,
    Bluetooth,
}

export namespace AdapterType {
    export function toString(t: AdapterType): string {
        const names = ['', 'nfc', 'barcode', 'bluetooth'];

        if (t < AdapterType.Nfc || t > AdapterType.Bluetooth) {
            return names[0];
        }
        return names[t];
    }

    export function parse(s: string): AdapterType {
        switch (s) {
            case AdapterType.toString(AdapterType.Nfc):
                return AdapterType.Nfc;
            case AdapterType.toString(AdapterType.Barcode):
                return AdapterType.Barcode;
            case AdapterType.toString(AdapterType.Bluetooth):
                return AdapterType.Bluetooth;
        }

        return AdapterType.Unknown;
    }
}

export interface AdapterResource {
    adapter_id: string;
    href: string;
    name: string;
    type: string;
    driver: string;
    kind: string;
}

export interface AdapterShortResource {
    adapter_id: string;
    kind: string;
    href: string;
    name: string;
    type: string;
}
