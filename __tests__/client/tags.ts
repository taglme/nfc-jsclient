import Api from '../../src/api';
import mockAxios from 'jest-mock-axios';
import { Tag, TagService } from '../../src/client/tags';
import { TagResource, TagType } from '../../src/models/tags';
import { str2ab } from '../../src/helpers/byte';

afterEach(() => {
    mockAxios.reset();
});

describe('TagService', () => {
    const api = new Api();

    it('Instance created', () => {
        const a = new TagService(api, 'url');
        expect(a).toBeInstanceOf(TagService);
    });

    it('getAll', () => {
        const catchFn = jest.fn();
        const thenFn = jest.fn();

        const a = new TagService(api, 'url');
        a.getAll('aId', TagType.Barcode)
            .then(thenFn)
            .catch(catchFn);

        expect(mockAxios).toHaveBeenCalledWith({
            data: undefined,
            headers: { common: [] },
            method: 'get',
            params: undefined,
            url: 'url/adapters/aId/tags?type=barcode',
        });

        const responseObj = {
            data: [
                {
                    // eslint-disable-next-line @typescript-eslint/camelcase
                    tag_id: 'test',
                    kind: 'test',
                    href: 'test',
                    type: TagType.toString(TagType.Bluetooth),
                    // eslint-disable-next-line @typescript-eslint/camelcase
                    adapter_id: 'test',
                    // eslint-disable-next-line @typescript-eslint/camelcase
                    adapter_name: 'test',
                    uid: 'za7VbYcSQU2zRgGQXQAm/g==',
                    atr: 'za7VbYcSQU2zRgGQXQAm/g==',
                    product: 'test',
                    vendor: 'test',
                },
            ] as TagResource[],
        };
        mockAxios.mockResponse(responseObj);

        expect(thenFn).toHaveBeenCalledWith([
            {
                adapterID: 'test',
                adapterName: 'test',
                atr: str2ab('za7VbYcSQU2zRgGQXQAm/g=='),
                product: 'test',
                tagID: 'test',
                type: TagType.Bluetooth,
                uid: str2ab('za7VbYcSQU2zRgGQXQAm/g=='),
                vendor: 'test',
            },
        ]);

        expect(catchFn).not.toHaveBeenCalled();
    });

    it('get', () => {
        const catchFn = jest.fn();
        const thenFn = jest.fn();

        const a = new TagService(api, 'url');
        a.get('aId', 'tagId')
            .then(thenFn)
            .catch(catchFn);

        expect(mockAxios).toHaveBeenCalledWith({
            data: undefined,
            headers: { common: [] },
            method: 'get',
            params: undefined,
            url: 'url/adapters/aId/tags/tagId',
        });

        const responseObj = {
            data: {
                // eslint-disable-next-line @typescript-eslint/camelcase
                tag_id: 'test',
                kind: 'test',
                href: 'test',
                type: TagType.toString(TagType.Bluetooth),
                // eslint-disable-next-line @typescript-eslint/camelcase
                adapter_id: 'test',
                // eslint-disable-next-line @typescript-eslint/camelcase
                adapter_name: 'test',
                uid: 'za7VbYcSQU2zRgGQXQAm/g==',
                atr: 'za7VbYcSQU2zRgGQXQAm/g==',
                product: 'test',
                vendor: 'test',
            } as TagResource,
        };
        mockAxios.mockResponse(responseObj);

        expect(thenFn).toHaveBeenCalledWith({
            adapterID: 'test',
            adapterName: 'test',
            atr: str2ab('za7VbYcSQU2zRgGQXQAm/g=='),
            product: 'test',
            tagID: 'test',
            type: TagType.Bluetooth,
            uid: str2ab('za7VbYcSQU2zRgGQXQAm/g=='),
            vendor: 'test',
        });

        expect(catchFn).not.toHaveBeenCalled();
    });
});

describe('Tag', () => {
    it('Instance created', () => {
        const tagR = {
            // eslint-disable-next-line @typescript-eslint/camelcase
            tag_id: 'test',
            kind: 'test',
            href: 'test',
            type: TagType.toString(TagType.Bluetooth),
            // eslint-disable-next-line @typescript-eslint/camelcase
            adapter_id: 'test',
            // eslint-disable-next-line @typescript-eslint/camelcase
            adapter_name: 'test',
            uid: 'za7VbYcSQU2zRgGQXQAm/g==',
            atr: 'za7VbYcSQU2zRgGQXQAm/g==',
            product: 'test',
            vendor: 'test',
        };

        const e = new Tag(tagR);
        expect(e).toBeInstanceOf(Tag);
        expect(e).toEqual({
            adapterID: 'test',
            adapterName: 'test',
            atr: str2ab('za7VbYcSQU2zRgGQXQAm/g=='),
            product: 'test',
            tagID: 'test',
            type: TagType.Bluetooth,
            uid: str2ab('za7VbYcSQU2zRgGQXQAm/g=='),
            vendor: 'test',
        });
    });
});