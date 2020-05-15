export const buildMultipleActionQueryParams = (keyword?: string, ids?: string): string => {
    let queryParams = '';

    if (keyword && !keyword.length) {
        queryParams += '&keyword=' + keyword;
    }

    if (ids && !ids.length) {
        queryParams += '&ids=' + ids;
    }

    return queryParams.replace('&', '?');
};
