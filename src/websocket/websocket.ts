import { client } from 'websocket';
import { EventEmitter } from 'events'
import { Rest } from './rest';

export class MessageWebsocket {
    socket: client; rest: Rest; logger: EventEmitter; stage: number; sn: number;
    constructor(rest: Rest, logger: EventEmitter) {
        this.socket = new client();
        this.rest = rest;
        this.logger = logger;
        this.stage = 0;
        this.sn = 0;
    }
    /**开始进行WebSocket连接 */
    connect = async () => {
        this.stage = 1;//获取 Gateway
        let ws_url = await this.rest.gateway.index(0);
        let retryCount = 0, retryTime = 0;
        this.socket.on('connect', conection => {

        });
        this.socket.on('connectFailed', async _ => {
            if (retryCount == 2) {
                this.logger.emit('warning', '连接文字WebSocket失败 并且重连超过两次，重新获取Gateway');
                ws_url = await this.rest.gateway.index(0);
            }
        });
        this.stage = 2;//连接 Gateway。如果连接失败，回退到第 1 步。
        this.socket.connect(ws_url);

    }
}