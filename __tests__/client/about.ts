import AboutService, { AppInfo } from '../../src/client/about';
import Api from '../../src/api';
import mockAxios from 'jest-mock-axios';
import { AppInfoResource } from '../../src/models/about';

afterEach(() => {
    mockAxios.reset();
});

describe('AboutService', () => {
    const api = new Api();

    it('Instance created', () => {
        const a = new AboutService(api, 'url');
        expect(a).toBeInstanceOf(AboutService);
    });

    it('get', () => {
        const thenFn = jest.fn(r => {
            expect(r).toBeInstanceOf(AppInfo);
        });

        const a = new AboutService(api, 'url');
        a.get().then(thenFn);

        mockAxios.mockResponse({
            data: {
                name: 'Name',
                version: 'Version',
                commit: 'Commit',
            },
        });

        expect(thenFn).toHaveBeenCalledWith({
            name: 'Name',
            version: 'Version',
            commit: 'Commit',
        });
    });
});
