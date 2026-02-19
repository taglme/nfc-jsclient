import Api from '../../src/api';
import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';
import AdapterService, { Adapter } from '../../src/client/adapters';
import { AdapterResource, AdapterStatus, AdapterType } from '../../src/models/adapters';

let mock: InstanceType<typeof AxiosMockAdapter>;

afterEach(() => {
    if (mock) {
        mock.restore();
    }
});

describe('AdapterService', () => {
    const api = new Api({}, axios.create());

    it('Instance created', () => {
        const a = new AdapterService(api, 'url');
        expect(a).toBeInstanceOf(AdapterService);
    });

    it('getFiltered', async () => {
        const instance = axios.create();
        mock = new AxiosMockAdapter(instance);
        const api = new Api({}, instance);

        const a = new AdapterService(api, 'url');
        mock.onGet('url/adapters?type=barcode').reply(200, [
            {
                adapter_id: 'test',
                href: 'test',
                name: 'test',
                type: AdapterType.toString(AdapterType.Barcode),
                driver: 'test',
                status: AdapterStatus.toString(AdapterStatus.Active),
                kind: 'test',
            } as AdapterResource,
        ]);

        await expect(a.getFiltered(AdapterType.Barcode)).resolves.toEqual([
            {
                adapterId: 'test',
                href: 'test',
                name: 'test',
                type: AdapterType.Barcode,
                status: AdapterStatus.Active,
                driver: 'test',
                kind: 'test',
            },
        ]);
    });

    it('get', async () => {
        const instance = axios.create();
        mock = new AxiosMockAdapter(instance);
        const api = new Api({}, instance);

        const a = new AdapterService(api, 'url');
        mock.onGet('url/adapters/aId').reply(200, {
            adapter_id: 'test',
            href: 'test',
            name: 'test',
            type: AdapterType.toString(AdapterType.Barcode),
            status: AdapterStatus.toString(AdapterStatus.Active),
            driver: 'test',
            kind: 'test',
        } as AdapterResource);

        await expect(a.get('aId')).resolves.toEqual({
            adapterId: 'test',
            href: 'test',
            name: 'test',
            type: AdapterType.Barcode,
            status: AdapterStatus.Active,
            driver: 'test',
            kind: 'test',
        });
    });
});

describe('Adapter', () => {
    it('Instance created', () => {
        const aR = {
            adapter_id: 'test',
            href: 'test',
            name: 'test',
            type: AdapterType.toString(AdapterType.Barcode),
            status: AdapterStatus.toString(AdapterStatus.Active),
            driver: 'test',
            kind: 'test',
        };

        const e = new Adapter(aR);
        expect(e).toBeInstanceOf(Adapter);
        expect(e).toEqual({
            adapterId: 'test',
            href: 'test',
            name: 'test',
            type: AdapterType.Barcode,
            status: AdapterStatus.Active,
            driver: 'test',
            kind: 'test',
        });
    });
});
