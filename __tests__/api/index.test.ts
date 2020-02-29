import Api from '../../src/api';
import mockAxios from 'jest-mock-axios';

afterEach(() => {
    mockAxios.reset();
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
        expect(mockAxios.create).toHaveBeenCalled();
    });

    it('requestHandlers exists', () => {
        const api = new Api();
        expect(Object.keys(api.requestHandlers)).toEqual(['get', 'post', 'put', 'patch', 'del']);
    });

    it('call get works properly', () => {
        const catchFn = jest.fn(),
            thenFn = jest.fn();

        const api = new Api();
        api.call(({ get }) => get('url', {}))
            .then(thenFn)
            .catch(catchFn);

        expect(mockAxios).toHaveBeenCalledWith({
            data: undefined,
            headers: { common: [] },
            method: 'get',
            params: undefined,
            url: 'url',
        });

        const responseObj = { data: 'server says hello!' };
        mockAxios.mockResponse(responseObj);

        expect(thenFn).toHaveBeenCalledWith('server says hello!');
        expect(catchFn).not.toHaveBeenCalled();
    });

    it('call post works properly', () => {
        const catchFn = jest.fn(),
            thenFn = jest.fn();

        const api = new Api();
        api.call(({ post }) => post('url', { data: 'any data to be posted' }))
            .then(thenFn)
            .catch(catchFn);

        expect(mockAxios).toHaveBeenCalledWith({
            data: 'any data to be posted',
            headers: { common: [] },
            method: 'post',
            params: undefined,
            url: 'url',
        });

        const responseObj = { data: 'server says hello!' };
        mockAxios.mockResponse(responseObj);

        expect(thenFn).toHaveBeenCalledWith('server says hello!');
        expect(catchFn).not.toHaveBeenCalled();
    });

    it('call put works properly', () => {
        const catchFn = jest.fn(),
            thenFn = jest.fn();

        const api = new Api();
        api.call(({ put }) => put('url', { data: 'any data to put' }))
            .then(thenFn)
            .catch(catchFn);

        expect(mockAxios).toHaveBeenCalledWith({
            data: 'any data to put',
            headers: { common: [] },
            method: 'put',
            params: undefined,
            url: 'url',
        });

        const responseObj = { data: 'server says hello!' };
        mockAxios.mockResponse(responseObj);

        expect(thenFn).toHaveBeenCalledWith('server says hello!');
        expect(catchFn).not.toHaveBeenCalled();
    });

    it('call del works properly', () => {
        const catchFn = jest.fn(),
            thenFn = jest.fn();

        const api = new Api();
        api.call(({ del }) => del('url', { data: 'any data to del' }))
            .then(thenFn)
            .catch(catchFn);

        expect(mockAxios).toHaveBeenCalledWith({
            data: 'any data to del',
            headers: { common: [] },
            method: 'delete',
            params: undefined,
            url: 'url',
        });

        const responseObj = { data: 'server says hello!' };
        mockAxios.mockResponse(responseObj);

        expect(thenFn).toHaveBeenCalledWith('server says hello!');
        expect(catchFn).not.toHaveBeenCalled();
    });

    it('call patch works properly', () => {
        const catchFn = jest.fn(),
            thenFn = jest.fn();

        const api = new Api();
        api.call(({ patch }) => patch('url', { data: 'any data to patch' }))
            .then(thenFn)
            .catch(catchFn);

        expect(mockAxios).toHaveBeenCalledWith({
            data: 'any data to patch',
            headers: { common: [] },
            method: 'patch',
            params: undefined,
            url: 'url',
        });

        const responseObj = { data: 'server says hello!' };
        mockAxios.mockResponse(responseObj);

        expect(thenFn).toHaveBeenCalledWith('server says hello!');
        expect(catchFn).not.toHaveBeenCalled();
    });

    it('call rejects Promise on error', () => {
        const thenFn = jest.fn();

        const api = new Api();
        api.call(({ get }) => get('url', {})).then(thenFn);

        expect(mockAxios).toHaveBeenCalledWith({
            data: undefined,
            headers: { common: [] },
            method: 'get',
            params: undefined,
            url: 'url',
        });

        const responseObj = { response: { data: 'server error!', status: 500, statusText: 'Error' } };
        mockAxios.mockError(responseObj);

        expect(thenFn).not.toHaveBeenCalled();
    });
});
