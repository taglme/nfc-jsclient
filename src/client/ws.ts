import { EventResource } from '../models/events';
import { Event } from './events';
import { Locale } from '../models/locales';
import { CommandString } from '../models/commands';

type EventHandler = (e: Event) => any;
type ErrorHandler = (e: Error) => any;

export default class WsService {
    private readonly url: string;
    private readonly path = '/ws';
    private readonly eventHandlers: EventHandler[];
    private readonly errorHandlers: ErrorHandler[];
    private conn?: WebSocket;

    constructor(url: string) {
        this.url = url;
        this.errorHandlers = [];
        this.eventHandlers = [];
        this.conn = undefined;
    }
    // Pass event to the registered event handlers
    // e – Event
    private eventListener = (e: Event): void => {
        this.eventHandlers.forEach(h => h(e));
    };

    // Pass error to the registered error handlers
    // e – error
    private errorListener = (e: Error): void => {
        this.errorHandlers.forEach(h => h(e));
    };

    private read = (e: EventResource): void => {
        const event = new Event(e);
        this.eventListener(event);
    };

    // Creating a WS connection and start listening for messages
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

    // Closing the WS connection and stop listening for messages
    public disconnect = (): void => {
        if (this.isConnected()) {
            this.conn.close();
            this.conn = undefined;
        }
    };

    // Checks if WS connection is established
    public isConnected = (): boolean => this.conn?.readyState === WebSocket.OPEN;

    // Sending a message to set locale via WS connection
    // locale – locale identifier string
    public setLocale = (l: string): void => {
        const locale = Locale.parse(l);

        this.conn.send(
            JSON.stringify({
                command: CommandString.SetLocale,
                params: {
                    locale: Locale.toString(locale),
                },
            }),
        );
    };

    // Handle event
    // handler – Function which is called once event is emitted
    onEvent = (h: (e: Event) => void): void => {
        this.eventHandlers.push(h);
    };

    // Handle error
    // h – Function which is called once error is emitted
    onError = (h: (e: Error) => void): void => {
        this.errorHandlers.push(h);
    };
}
