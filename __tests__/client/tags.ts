import Api from '../../src/api';
import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';
import { Tag, TagService } from '../../src/client/tags';
import { TagResource, TagType } from '../../src/models/tags';
import { base64ToHex } from '../../src/helpers/base64';

let mock: InstanceType<typeof AxiosMockAdapter>;

afterEach(() => {
    if (mock) {
        mock.restore();
    }
});

describe('TagService', () => {
    const api = new Api({}, axios.create());

    it('Instance created', () => {
        const a = new TagService(api, 'url');
        expect(a).toBeInstanceOf(TagService);
    });

    it('getAll', async () => {
        const instance = axios.create();
        mock = new AxiosMockAdapter(instance);
        const api = new Api({}, instance);
        const a = new TagService(api, 'url');

        mock.onGet('url/adapters/aId/tags?type=barcode').reply(200, [
            {
                tag_id: 'test',
                kind: 'test',
                href: 'test',
                type: TagType.toString(TagType.Bluetooth),
                adapter_id: 'test',
                adapter_name: 'test',
                uid: 'za7VbYcSQU2zRgGQXQAm/g==',
                atr: 'za7VbYcSQU2zRgGQXQAm/g==',
                product: 'test',
                vendor: 'test',
            } as TagResource,
        ]);

        await expect(a.getAll('aId', TagType.Barcode)).resolves.toEqual([
            {
                adapterID: 'test',
                adapterName: 'test',
                atr: base64ToHex('za7VbYcSQU2zRgGQXQAm/g=='),
                product: 'test',
                tagID: 'test',
                type: TagType.Bluetooth,
                uid: base64ToHex('za7VbYcSQU2zRgGQXQAm/g=='),
                vendor: 'test',
            },
        ]);
    });

    it('get', async () => {
        const instance = axios.create();
        mock = new AxiosMockAdapter(instance);
        const api = new Api({}, instance);
        const a = new TagService(api, 'url');

        mock.onGet('url/adapters/aId/tags/tagId').reply(200, {
            tag_id: 'test',
            kind: 'test',
            href: 'test',
            type: TagType.toString(TagType.Bluetooth),
            adapter_id: 'test',
            adapter_name: 'test',
            uid: 'za7VbYcSQU2zRgGQXQAm/g==',
            atr: 'za7VbYcSQU2zRgGQXQAm/g==',
            product: 'test',
            vendor: 'test',
        } as TagResource);

        await expect(a.get('aId', 'tagId')).resolves.toEqual({
            adapterID: 'test',
            adapterName: 'test',
            atr: base64ToHex('za7VbYcSQU2zRgGQXQAm/g=='),
            product: 'test',
            tagID: 'test',
            type: TagType.Bluetooth,
            uid: base64ToHex('za7VbYcSQU2zRgGQXQAm/g=='),
            vendor: 'test',
        });
    });
});

describe('Tag', () => {
    it('Instance created', () => {
        const tagR = {
            tag_id: 'test',
            kind: 'test',
            href: 'test',
            type: TagType.toString(TagType.Bluetooth),
            adapter_id: 'test',
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
            atr: base64ToHex('za7VbYcSQU2zRgGQXQAm/g=='),
            product: 'test',
            tagID: 'test',
            type: TagType.Bluetooth,
            uid: base64ToHex('za7VbYcSQU2zRgGQXQAm/g=='),
            vendor: 'test',
        });
    });
});
