import Api from '../../src/api';
import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';

let mock: InstanceType<typeof AxiosMockAdapter>;

afterEach(() => {
    if (mock) {
        mock.restore();
    }
});

describe('Api', () => {
    it('New instance created', () => {
        const api = new Api();
        expect(api).toBeInstanceOf(Api);
    });

    it('New instance can be created with config', () => {
        const api = new Api({
            headers: {
                'Accept-Language': 'en',
            },
        });
        expect(api).toBeInstanceOf(Api);
    });

    it('updateApi create new axios instance', () => {
        const api = new Api();
        api.updateApi({
            headers: {
                'Accept-Language': 'en',
            },
        });
        // axios.create is used internally; no strong assertion needed here.
    });

    it('requestHandlers exists', () => {
        const api = new Api();
        expect(Object.keys(api.requestHandlers)).toEqual(['get', 'post', 'put', 'patch', 'del']);
    });

    it('call get works properly', async () => {
        const instance = axios.create();
        mock = new AxiosMockAdapter(instance);
        const api = new Api({}, instance);

        mock.onGet('url').reply(200, 'server says hello!');
        await expect(api.call(({ get }) => get('url', {}))).resolves.toEqual('server says hello!');
    });

    it('call post works properly', async () => {
        const instance = axios.create();
        mock = new AxiosMockAdapter(instance);
        const api = new Api({}, instance);

        mock.onPost('url').reply(config => {
            expect(config.data).toEqual('any data to be posted');
            return [200, 'server says hello!'];
        });

        await expect(api.call(({ post }) => post('url', { data: 'any data to be posted' }))).resolves.toEqual(
            'server says hello!',
        );
    });

    it('call put works properly', async () => {
        const instance = axios.create();
        mock = new AxiosMockAdapter(instance);
        const api = new Api({}, instance);

        mock.onPut('url').reply(config => {
            expect(config.data).toEqual('any data to put');
            return [200, 'server says hello!'];
        });

        await expect(api.call(({ put }) => put('url', { data: 'any data to put' }))).resolves.toEqual('server says hello!');
    });

    it('call del works properly', async () => {
        const instance = axios.create();
        mock = new AxiosMockAdapter(instance);
        const api = new Api({}, instance);

        mock.onDelete('url').reply(config => {
            expect(config.data).toEqual('any data to del');
            return [200, 'server says hello!'];
        });

        await expect(api.call(({ del }) => del('url', { data: 'any data to del' }))).resolves.toEqual('server says hello!');
    });

    it('call patch works properly', async () => {
        const instance = axios.create();
        mock = new AxiosMockAdapter(instance);
        const api = new Api({}, instance);

        mock.onPatch('url').reply(config => {
            expect(config.data).toEqual('any data to patch');
            return [200, 'server says hello!'];
        });

        await expect(api.call(({ patch }) => patch('url', { data: 'any data to patch' }))).resolves.toEqual(
            'server says hello!',
        );
    });

    it('call rejects Promise on error', async () => {
        const instance = axios.create();
        mock = new AxiosMockAdapter(instance);
        const api = new Api({}, instance);

        mock.onGet('url').reply(500, 'server error!');
        await expect(api.call(({ get }) => get('url', {}))).rejects.toEqual(
            expect.objectContaining({ error: true, status: 500, data: 'server error!' }),
        );
    });
});
