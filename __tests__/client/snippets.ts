import Api from '../../src/api';
import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';
import { SnippetCategory, SnippetResource } from '../../src/models/snippets';
import { SnippetService, Snippet } from '../../src/client/snippets';

let mock: InstanceType<typeof AxiosMockAdapter>;

afterEach(() => {
    if (mock) {
        mock.restore();
    }
});

describe('SnippetService', () => {
    const api = new Api({}, axios.create());

    it('Instance created', () => {
        const a = new SnippetService(api, 'url');
        expect(a).toBeInstanceOf(SnippetService);
    });

    it('getFiltered', async () => {
        const instance = axios.create();
        mock = new AxiosMockAdapter(instance);
        const api = new Api({}, instance);
        const a = new SnippetService(api, 'url');

        mock.onGet('url/snippets?category=adapter').reply(200, [
            {
                name: 'test',
                category: SnippetCategory.toString(SnippetCategory.TagSnippet),
                usage_id: 'test',
                usage_name: 'test',
                description: 'test',
                code: 'test',
            } as SnippetResource,
        ]);

        await expect(a.getFiltered({ category: SnippetCategory.AdapterSnippet })).resolves.toEqual([
            {
                name: 'test',
                category: SnippetCategory.TagSnippet,
                usageId: 'test',
                usageName: 'test',
                description: 'test',
                code: 'test',
            },
        ]);
    });
});

describe('Snippet', () => {
    it('Instance created', () => {
        const snippetR = {
            name: 'test',
            category: SnippetCategory.toString(SnippetCategory.TagSnippet),
            usage_id: 'test',
            usage_name: 'test',
            description: 'test',
            code: 'test',
        };

        const e = new Snippet(snippetR);
        expect(e).toBeInstanceOf(Snippet);
        expect(e).toEqual({
            name: 'test',
            category: SnippetCategory.TagSnippet,
            usageId: 'test',
            usageName: 'test',
            description: 'test',
            code: 'test',
        });
    });
});
