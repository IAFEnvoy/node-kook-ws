import { EventEmitter } from "events";
import { Rest } from "./rest";
import { MessageWebsocket } from "./websocket";

export class WebSocketClient {
    /**机器人的token */
    token: string;
    /**消息处理器 */
    message: EventEmitter;
    /**事件处理器 */
    event: EventEmitter;
    /**日志处理器 */
    logger: EventEmitter;
    /**WebSocket事件处理器 */
    wsEvent: EventEmitter;
    /**提供接口的所有直接实现 */
    rest: Rest;
    /**文字频道WebSocket */
    websocket: MessageWebsocket;
    constructor(token: string) {
        this.token = token;
        this.message = new EventEmitter();
        this.event = new EventEmitter();
        this.logger = new EventEmitter();
        this.wsEvent = new EventEmitter();
        this.rest = new Rest(this);
        this.websocket = new MessageWebsocket(this.rest, this.logger, this.wsEvent);
    }
    /**
     * 封装好的请求方法，可直接使用当前token进行请求
     * @param url 请求的url
     * @param method 请求方式，默认为GET
     * @param data 如果为GET则为query数据，如果为POST则为form数据
     * @returns 请求到的JSON
     */
    axios = async (url: string, method?: 'GET' | 'POST', data?: Array<Array<string | undefined>>) => {
        if (method == 'POST') {
            let form = new FormData();
            data?.forEach(x => {
                if (x[0] != null && x[1] != null)
                    form.append(x[0], x[1]);
            });
            return await fetch(url, {
                method: 'POST',
                headers: { Authorization: 'Bot ' + this.token },
                body: form
            }).then(res => res.json())
        } else {
            if (data != null)
                url += '?' + data?.reduce((p, c) => {
                    if (c[0] != null && c[1] != null)
                        p.push(c[0] + '=' + c[1]);
                    return p;
                }, []).join('&');
            return await fetch(url, {
                method: 'GET',
                headers: { Authorization: 'Bot ' + this.token }
            }).then(res => res.json())
        }
    }
    /**连接机器人的WebSocket */
    connect = () => this.websocket.connect()
}