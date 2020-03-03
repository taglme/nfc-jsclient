export function ab2str(buf): string {
    return String.fromCharCode.apply(null, new Uint16Array(buf));
}

export function str2ab(str: string): Uint8Array {
    const buf = new ArrayBuffer(str.length); // 2 bytes for each char
    const bufView = new Uint8Array(buf);

    for (let i = 0, strLen = str.length; i < strLen; i++) {
        bufView[i] = str.charCodeAt(i);
    }

    return bufView;
}
