export enum AdapterType {
    AdapterTypeNfc = 1,
    AdapterTypeBarcode = 2,
    AdapterTypeBluetooth = 3,
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
