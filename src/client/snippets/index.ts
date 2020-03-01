import { SnippetCategory, SnippetFilter, SnippetResource } from './types';
import Api from '../../api';
import { AdapterResource, AdapterShortResource, AdapterType } from '../adapters/types';
import { buildSnippetsQueryParams } from './helpers';

class Snippet {
    name: string;
    category: SnippetCategory;
    usageID: string;
    usageName: string;
    description: string;
    code: string;

    constructor(s: SnippetResource) {
        this.name = s.name;
        this.category = SnippetCategory.parse(s.category);
        this.usageID = s.usage_id;
        this.usageName = s.usage_name;
        this.description = s.description;
        this.code = s.code;
    }
}

export class SnippetService {
    private readonly url: string;
    private api: Api;
    private path = '/snippets';

    constructor(api: Api, url: string) {
        this.url = url;
        this.api = api;
    }

    getAll = (): Promise<Snippet[]> => this.getFiltered({});

    getFiltered = (filter: SnippetFilter): Promise<Snippet[]> => {
        const url = this.url + this.path + buildSnippetsQueryParams(filter);

        return this.api
            .call<SnippetResource[]>(({ get }) => get(url, {}))
            .then<Snippet[]>(resp => resp.map(a => new Snippet(a)));
    };
}
