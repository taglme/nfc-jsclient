import { SnippetCategory, SnippetFilter, SnippetResource } from '../models/snippets';
import { buildSnippetsQueryParams } from '../helpers/snippets';
import { IApi } from '../interfaces';

export class Snippet {
    name: string;
    category: SnippetCategory;
    usageId: string;
    usageName: string;
    description: string;
    code: string;

    constructor(s: SnippetResource) {
        this.name = s.name;
        this.category = SnippetCategory.parse(s.category);
        this.usageId = s.usage_id;
        this.usageName = s.usage_name;
        this.description = s.description;
        this.code = s.code;
    }
}

export class SnippetService {
    private readonly url: string;
    private api: IApi;
    private path = '/snippets';

    constructor(api: IApi, url: string) {
        this.url = url;
        this.api = api;
    }

    // Snippets list endpoint returns information about all snippets. The response includes array of Snippets
    getAll = (): Promise<Snippet[]> => this.getFiltered({});

    // Snippets list endpoint returns information about all snippets. The response includes array of Snippets
    // category – category filter for snippet.
    // usage_id – usage_id filter for snippet
    getFiltered = (filter: SnippetFilter): Promise<Snippet[]> => {
        const url = this.url + this.path + buildSnippetsQueryParams(filter);

        return this.api
            .call<SnippetResource[]>(({ get }) => get(url, {}))
            .then<Snippet[]>(resp => resp.map(a => new Snippet(a)))
            .catch((err: Error) => {
                throw new Error('Error on snippets get filtered: ' + JSON.stringify(err));
            });
    };
}
