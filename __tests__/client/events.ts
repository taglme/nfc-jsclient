import Api from '../../src/api';
import mockAxios from 'jest-mock-axios';
import EventService, { Event } from '../../src/client/events';
import { EventListResource, EventName, EventResource } from '../../src/models/events';

afterEach(() => {
    mockAxios.reset();
});

describe('EventService', () => {
    const api = new Api();

    it('Instance created', () => {
        const a = new EventService(api, 'url');
        expect(a).toBeInstanceOf(EventService);
    });

    it('getFiltered', () => {
        const catchFn = jest.fn();
        const thenFn = jest.fn();

        const a = new EventService(api, 'url');
        a.getFiltered('aId', {})
            .then(thenFn)
            .catch(catchFn);

        expect(mockAxios).toHaveBeenCalledWith({
            data: undefined,
            headers: { common: [] },
            method: 'get',
            params: undefined,
            url: 'url/events?adapter_id=aId',
        });

        const responseObj = {
            data: {
                total: 1,
                length: 1,
                limit: 1,
                offset: 1,
                items: [
                    {
                        event_id: 'string',
                        name: EventName.toString(EventName.TagDiscovery),
                        adapter_id: 'string',
                        adapter_name: 'string',
                        data: {},
                        created_at: '2020-03-03T10:12:03.881Z',
                    },
                ],
            } as EventListResource,
        };
        mockAxios.mockResponse(responseObj);

        expect(thenFn).toHaveBeenCalledWith({
            pagInfo: {
                total: 1,
                length: 1,
                limit: 1,
                offset: 1,
            },
            items: [
                {
                    eventID: 'string',
                    name: EventName.TagDiscovery,
                    adapterID: 'string',
                    adapterName: 'string',
                    data: {},
                    createdAt: new Date('2020-03-03T10:12:03.881Z'),
                },
            ],
        });

        expect(catchFn).not.toHaveBeenCalled();
    });

    it('add', () => {
        const catchFn = jest.fn();
        const thenFn = jest.fn();

        const a = new EventService(api, 'url');
        a.add({
            name: EventName.toString(EventName.TagDiscovery),
            adapter_id: 'string',
            data: {},
        })
            .then(thenFn)
            .catch(catchFn);

        expect(mockAxios).toHaveBeenCalledWith({
            data: undefined,
            headers: { common: [] },
            method: 'get',
            params: undefined,
            url: 'url/events?adapter_id=aId',
        });

        const responseObj = {
            data: {
                event_id: 'string',
                name: EventName.toString(EventName.TagDiscovery),
                adapter_id: 'string',
                adapter_name: 'string',
                data: {},
                created_at: '2020-03-03T10:12:03.881Z',
            } as EventResource,
        };
        mockAxios.mockResponse(responseObj);

        expect(thenFn).toHaveBeenCalledWith({
            eventID: 'string',
            name: EventName.TagDiscovery,
            adapterID: 'string',
            adapterName: 'string',
            data: {},
            createdAt: new Date('2020-03-03T10:12:03.881Z'),
        });

        expect(catchFn).not.toHaveBeenCalled();
    });
});

describe('Event', () => {
    it('Instance created', () => {
        const eR = {
            event_id: 'string',
            name: EventName.toString(EventName.TagDiscovery),
            adapter_id: 'string',
            adapter_name: 'string',
            data: {},
            created_at: '2020-03-03T10:12:03.881Z',
        };

        const e = new Event(eR);
        expect(e).toBeInstanceOf(Event);
        expect(e).toEqual({
            eventID: 'string',
            name: EventName.TagDiscovery,
            adapterID: 'string',
            adapterName: 'string',
            data: {},
            createdAt: new Date('2020-03-03T10:12:03.881Z'),
        });
    });
});
