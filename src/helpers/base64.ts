export const hexToBase64 = (str: string): string =>
    btoa(
        String.fromCharCode.apply(
            null,
            str
                .replace(/,/g, '')
                .replace(/0x/g, '')
                .replace(/\r|\n/g, '')
                .replace(/([\da-fA-F]{2}) ?/g, '0x$1 ')
                .replace(/ +$/, '')
                .split(' '),
        ),
    );

export const base64ToHex = (str: string): string => {
    const bin = atob(str.replace(/[ \r\n]+$/, ''));
    const hex = [];

    for (let i = 0; i < bin.length; ++i) {
        let tmp = bin.charCodeAt(i).toString(16);
        if (tmp.length === 1) {
            tmp = '0' + tmp;
        }
        hex[hex.length] = tmp;
    }

    return `0x${hex.join(' 0x')}`;
};
