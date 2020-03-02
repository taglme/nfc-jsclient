import { EventResource } from '../models/events';
import { Event } from './events';

type EventHandler = (e: Event) => any;
type ErrorHandler = (e: Error) => any;

export default class WsService {
    private readonly url: string;
    private readonly path = '/ws';
    private readonly eventHandlers: EventHandler[];
    private readonly errorHandlers: ErrorHandler[];
    private conn?: WebSocket;

    constructor(url: string) {
        this.url = url.replace(/(http(s)?:)/g, 'ws:');
        this.errorHandlers = [];
        this.eventHandlers = [];
        this.conn = undefined;
    }

    private eventListener = (e: Event): void => {
        this.eventHandlers.forEach(h => h(e));
    };

    private errorListener = (e: Error): void => {
        this.errorHandlers.forEach(h => h(e));
    };

    private read = (e: EventResource): void => {
        const event = new Event(e);
        this.eventListener(event);
    };

    public connect = (): void => {
        this.conn = new WebSocket(this.url + this.path);

        this.conn.onopen = (): void => {
            this.conn.onmessage = (event): void => {
                const data = JSON.parse(event.data);

                this.read(data);
            };
        };

        this.conn.onerror = (e: CloseEvent): void => {
            this.errorListener(new Error(`Error on ws connect init: ${e.code}. Reason: ${e.reason}`));
        };
    };

    public disconnect = (): void => {
        if (this.isConnected()) {
            this.conn.close();
            this.conn = undefined;
        }
    };

    public isConnected = (): boolean => this.conn?.readyState === WebSocket.OPEN;
}
