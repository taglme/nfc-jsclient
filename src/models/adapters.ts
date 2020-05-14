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

export enum AdapterStatus {
    Unknown,
    Inactive,
    Active,
    Paused,
}

export namespace AdapterStatus {
    export function toString(t: AdapterStatus): string {
        const names = ['', 'inactive', 'active', 'paused'];

        if (t < AdapterStatus.Inactive || t > AdapterStatus.Paused) {
            return names[0];
        }
        return names[t];
    }

    export function parse(s: string): AdapterStatus {
        switch (s) {
            case AdapterStatus.toString(AdapterStatus.Inactive):
                return AdapterStatus.Inactive;
            case AdapterStatus.toString(AdapterStatus.Active):
                return AdapterStatus.Active;
            case AdapterStatus.toString(AdapterStatus.Paused):
                return AdapterStatus.Paused;
        }

        return AdapterStatus.Unknown;
    }
}

export interface AdapterResource {
    adapter_id: string;
    href: string;
    name: string;
    type: string;
    driver: string;
    kind: string;
    status: string;
}

export interface AdapterShortResource {
    adapter_id: string;
    kind: string;
    href: string;
    name: string;
    type: string;
    status: string;
}
