export { default } from './client';

// Below is written for testing purposes and  will be removed
import Client from './client';

const client = new Client('http://127.0.0.1:3011', 'en');
client.About.get();
