import Api from '../../src/api';
import mockAxios from 'jest-mock-axios';
import AdapterService, { Adapter } from '../../src/client/adapters';
import { AdapterResource, AdapterStatus, AdapterType } from '../../src/models/adapters';

afterEach(() => {
    mockAxios.reset();
});

describe('AdapterService', () => {
    const api = new Api();

    it('Instance created', () => {
        const a = new AdapterService(api, 'url');
        expect(a).toBeInstanceOf(AdapterService);
    });

    it('getFiltered', () => {
        const catchFn = jest.fn();
        const thenFn = jest.fn();

        const a = new AdapterService(api, 'url');
        a.getFiltered(AdapterType.Barcode)
            .then(thenFn)
            .catch(catchFn);

        expect(mockAxios).toHaveBeenCalledWith({
            data: undefined,
            headers: { common: [] },
            method: 'get',
            params: undefined,
            url: 'url/adapters?type=barcode',
        });

        const responseObj = {
            data: [
                {
                    adapter_id: 'test',
                    href: 'test',
                    name: 'test',
                    type: AdapterType.toString(AdapterType.Barcode),
                    driver: 'test',
                    status: AdapterStatus.toString(AdapterStatus.Active),
                    kind: 'test',
                },
            ] as AdapterResource[],
        };
        mockAxios.mockResponse(responseObj);

        expect(thenFn).toHaveBeenCalledWith([
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

        expect(catchFn).not.toHaveBeenCalled();
    });

    it('get', () => {
        const catchFn = jest.fn();
        const thenFn = jest.fn();

        const a = new AdapterService(api, 'url');
        a.get('aId')
            .then(thenFn)
            .catch(catchFn);

        expect(mockAxios).toHaveBeenCalledWith({
            data: undefined,
            headers: { common: [] },
            method: 'get',
            params: undefined,
            url: 'url/adapters/aId',
        });

        const responseObj = {
            data: {
                adapter_id: 'test',
                href: 'test',
                name: 'test',
                type: AdapterType.toString(AdapterType.Barcode),
                status: AdapterStatus.toString(AdapterStatus.Active),
                driver: 'test',
                kind: 'test',
            } as AdapterResource,
        };
        mockAxios.mockResponse(responseObj);

        expect(thenFn).toHaveBeenCalledWith({
            adapterId: 'test',
            href: 'test',
            name: 'test',
            type: AdapterType.Barcode,
            status: AdapterStatus.Active,
            driver: 'test',
            kind: 'test',
        });

        expect(catchFn).not.toHaveBeenCalled();
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
