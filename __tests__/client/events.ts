import Api from '../../src/api';
import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';
import EventService, { Event } from '../../src/client/events';
import { EventListResource, EventName, EventResource } from '../../src/models/events';

let mock: InstanceType<typeof AxiosMockAdapter>;

afterEach(() => {
    if (mock) {
        mock.restore();
    }
});

describe('EventService', () => {
    const api = new Api({}, axios.create());

    it('Instance created', () => {
        const a = new EventService(api, 'url');
        expect(a).toBeInstanceOf(EventService);
    });

    it('getFiltered', async () => {
        const instance = axios.create();
        mock = new AxiosMockAdapter(instance);
        const api = new Api({}, instance);
        const a = new EventService(api, 'url');

        mock.onGet('url/events?adapter_id=aId').reply(200, {
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
        } as EventListResource);

        await expect(a.getFiltered('aId', {})).resolves.toEqual({
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
    });

    it('add', async () => {
        const instance = axios.create();
        mock = new AxiosMockAdapter(instance);
        const api = new Api({}, instance);
        const a = new EventService(api, 'url');

        mock.onPost('url/events').reply(config => {
            expect(JSON.parse(config.data)).toEqual({
                e: {
                    name: EventName.toString(EventName.TagDiscovery),
                    adapter_id: 'string',
                    data: {},
                },
            });
            return [
                200,
                {
                    event_id: 'string',
                    name: EventName.toString(EventName.TagDiscovery),
                    adapter_id: 'string',
                    adapter_name: 'string',
                    data: {},
                    created_at: '2020-03-03T10:12:03.881Z',
                } as EventResource,
            ];
        });

        const e = await a.add({
            name: EventName.toString(EventName.TagDiscovery),
            adapter_id: 'string',
            data: {},
        });
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
