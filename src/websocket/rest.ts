//这里全都是raw接口，fetch实现，需要NodeJS 18+
const baseUrl = "https://www.kookapp.cn/api/";

export class Rest {
    token: string;
    gateway: Gateway;
    constructor(token: string) {
        this.token = token;
        this.gateway = new Gateway(this.token);
    }
}

class Guild {
    token: string;
    constructor(token: string) { this.token = token }

}

class Channel {
    token: string;
    constructor(token: string) { this.token = token }

}

class Message {
    token: string;
    constructor(token: string) { this.token = token }

}

class ChannelUser {
    token: string;
    constructor(token: string) { this.token = token }

}

class UserChat {
    token: string;
    constructor(token: string) { this.token = token }

}

class DirectMessage {
    token: string;
    constructor(token: string) { this.token = token }

}

class Gateway {
    token: string;
    constructor(token: string) { this.token = token }
    /**
     * 获取网关的连接地址
     * @param compress 数据是否压缩，1为压缩（sdk不负责解压）
     * @returns 网关URL
     */
    index = async (compress: 0 | 1): Promise<string> => {
        const res = await fetch(baseUrl + 'v3/gateway/index?compress=' + compress, {
            method: 'GET',
            headers: { Authorization: 'Bot ' + this.token }
        });
        const json = await res.json();
        return json.data.url;
    }
}

class User {
    token: string;
    constructor(token: string) { this.token = token }

}

class Asset {
    token: string;
    constructor(token: string) { this.token = token }

}

class GuildRole {
    token: string;
    constructor(token: string) { this.token = token }

}

class Intimacy {
    token: string;
    constructor(token: string) { this.token = token }

}

class GuildEmoji {
    token: string;
    constructor(token: string) { this.token = token }

}

class Invite {
    token: string;
    constructor(token: string) { this.token = token }

}

class BlackList {
    token: string;
    constructor(token: string) { this.token = token }

}

class Badge {
    token: string;
    constructor(token: string) { this.token = token }

}

class Game {
    token: string;
    constructor(token: string) { this.token = token }

}

class OAuth {
    token: string;
    constructor(token: string) { this.token = token }

}