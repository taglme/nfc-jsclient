import Api from '../../src/api';
import mockAxios from 'jest-mock-axios';
import { SnippetCategory, SnippetResource } from '../../src/models/snippets';
import { SnippetService, Snippet } from '../../src/client/snippets';

afterEach(() => {
    mockAxios.reset();
});

describe('SnippetService', () => {
    const api = new Api();

    it('Instance created', () => {
        const a = new SnippetService(api, 'url');
        expect(a).toBeInstanceOf(SnippetService);
    });

    it('getFiltered', () => {
        const catchFn = jest.fn();
        const thenFn = jest.fn();

        const a = new SnippetService(api, 'url');
        a.getFiltered({ category: SnippetCategory.AdapterSnippet })
            .then(thenFn)
            .catch(catchFn);

        expect(mockAxios).toHaveBeenCalledWith({
            data: undefined,
            headers: { common: [] },
            method: 'get',
            params: undefined,
            url: 'url/snippets?category=adapter',
        });

        const responseObj = {
            data: [
                {
                    name: 'test',
                    category: SnippetCategory.toString(SnippetCategory.TagSnippet),
                    usage_id: 'test',
                    usage_name: 'test',
                    description: 'test',
                    code: 'test',
                },
            ] as SnippetResource[],
        };
        mockAxios.mockResponse(responseObj);

        expect(thenFn).toHaveBeenCalledWith([
            {
                name: 'test',
                category: SnippetCategory.TagSnippet,
                usageId: 'test',
                usageName: 'test',
                description: 'test',
                code: 'test',
            },
        ]);

        expect(catchFn).not.toHaveBeenCalled();
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
