import { SnippetCategory, SnippetFilter } from './types';

export const buildSnippetsQueryParams = (filter: SnippetFilter): string => {
    let queryParams = '';

    if (filter.usageId) {
        queryParams += '&usage_id=' + filter.usageId;
    }

    if (filter.category) {
        queryParams += '&category=' + SnippetCategory.toString(filter.category);
    }

    return queryParams.replace('&', '?');
};
