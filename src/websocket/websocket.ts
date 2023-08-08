import { client, connection } from 'websocket';
import { EventEmitter } from 'events'
import { Rest } from './rest';

export class MessageWebsocket {
    socket: client; rest: Rest; logger: EventEmitter; event: EventEmitter; stage: number; conection: connection | null;
    connected: boolean; session_id: string; received_pong: boolean;
    sn: number; snTemp: Record<number, any>;
    constructor(rest: Rest, logger: EventEmitter, event: EventEmitter) {
        this.socket = new client();
        this.rest = rest;
        this.logger = logger;
        this.event = event;
        this.stage = 0;
        this.session_id = "";
        this.received_pong = false;
        this.sn = 0;
        this.snTemp = {};
        this.conection = null;
        this.connected = false;
        this.event.once('connected', _ => {
            setInterval(() => {
                if (this.connected) {
                    this.conection?.send(JSON.stringify({ "s": 2, "sn": this.sn }));
                    setTimeout(() => {
                        if (this.received_pong)
                            this.received_pong = false;
                        else {//进入超时状态

                        }
                    }, 6 * 1000);
                }
            }, 30 * 1000);
        })
    }
    /**开始进行WebSocket连接 */
    connect = async () => {
        this.stage = 1;//获取 Gateway
        let ws_url = await this.rest.gateway.index(0);
        let retryCount = 0;
        this.socket.on('connect', conection => {
            this.conection = conection;
            this.conection.on('message', data => {
                if (data.type == 'utf8') {
                    this.logger.emit('websocket', data.utf8Data);
                    let json = JSON.parse(data.utf8Data);
                    if (json.s == 0) {//server->client	消息(包含聊天和通知消息)
                        let sn = json.sn;
                        if (sn == this.sn + 1) {
                            this.event.emit('message', json.d);
                            this.sn++;
                            while (this.snTemp[this.sn + 1] != null) {
                                this.event.emit('message', this.snTemp[this.sn + 1]);
                                this.sn++;
                            }
                        } else {
                            this.logger.emit('warning', `接收到消息sn为${sn}，应为${this.sn + 1}`);
                            this.snTemp[sn] = json.d;
                        }
                    } else if (json.s == 1) {//server->client	客户端连接 ws 时, 服务端返回握手结果
                        let d = json.d;
                        if (d.code == 0) {
                            this.connected = true;
                            this.session_id = d.session_id;
                            this.event.emit('connected');
                        } else {
                            this.event.emit('error', d);
                        }
                    } else if (json.s == 3) //server->client	心跳，pong
                        this.received_pong = true;
                    else if (json.s == 4) { //client->server	resume, 恢复会话

                    } else if (json.s == 5) {//server->client	reconnect, 要求客户端断开当前连接重新连接

                    } else if (json.s == 6) {//server->client	resume ack

                    }
                }
            })
        });
        this.socket.on('connectFailed', async _ => {
            if (retryCount == 2) {
                this.logger.emit('error', '连接文字WebSocket失败，并且重连超过两次，重新获取Gateway');
                ws_url = await this.rest.gateway.index(0);
                retryCount = 0;
            } else {
                this.logger.emit('warning', '连接文字WebSocket失败，正在尝试重连');
                retryCount++;
            }
        });
        this.stage = 2;//连接 Gateway。如果连接失败，回退到第 1 步。
        this.socket.connect(ws_url);

    }
}