import WS from 'jest-websocket-mock';
import WsService from '../../src/client/ws';
import { CommandString } from '../../src/models/commands';
import { Locale } from '../../src/models/locales';

let server = undefined;

beforeEach(() => {
    server = new WS('ws://localhost:1234/ws');
});

afterEach(() => {
    server.close();
    WS.clean();
});

describe('WsService', () => {
    it('Instance created', async () => {
        const a = new WsService('http://localhost:1234');
        expect(a).toBeInstanceOf(WsService);
    });

    it('Connect & isConnected & disconnect', async () => {
        const a = new WsService('http://localhost:1234');
        expect(a.isConnected()).toEqual(false);
        a.connect();
        await server.connected;
        expect(a.isConnected()).toEqual(true);
        a.disconnect();
        expect(a.isConnected()).toEqual(false);
    });

    it('en', async () => {
        const a = new WsService('http://localhost:1234');
        expect(a.isConnected()).toEqual(false);
        a.connect();
        await server.connected;
        a.setLocale('en');
        await expect(server).toReceiveMessage(
            JSON.stringify({
                command: CommandString.SetLocale,
                params: {
                    locale: Locale.toString(Locale.En),
                },
            }),
        );
        expect(server).toHaveReceivedMessages(['{"command":"set_locale","params":{"locale":"en"}}']);
    });
});
