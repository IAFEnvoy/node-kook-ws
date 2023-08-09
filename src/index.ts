import { EventEmitter } from "events";
import { Rest } from "./websocket/rest";
import { MessageWebsocket } from "./websocket/websocket";
import { WebSocketClient } from "./websocket/client";

const token = '1/MTYxNTI=/eCOnIAGXnYFzW7B6zlGhdw=='
let logger = new EventEmitter(), event = new EventEmitter();
const bot = new WebSocketClient(token);
logger.on('websocket', message => console.log(message));
logger.on('warning', message => console.log(message));
event.on('connected', () => console.log('机器人已连接到Kook服务器'));
event.on('err', err => console.log(err));
event.on('message', message => console.log(message));
bot.connect();
bot.rest.channelUser.getJoinedChannel('8895014402422908', '2852054623').then(res => console.log(res));