import { IChannel, IGuild, IUser } from "../kook/objects";
import { UserList } from "../kook/response";
import { WebSocketClient } from "./client";

const baseUrl = "https://www.kookapp.cn/api/";

//这里全都是raw接口，fetch实现，需要NodeJS 18+
export class Rest {
    private webSocketClient: WebSocketClient;
    /**服务器相关接口 */
    guild: Guild;
    /**服务器静音相关接口 */
    guildMute: GuildMute;
    /**服务器助力相关接口 */
    guildBoost: GuildBoost;
    /**频道相关接口 */
    channel: Channel;
    /**频道角色相关接口 */
    channelRole: ChannelRole;
    /**频道消息相关接口 */
    message: Message;
    /**频道用户相关接口 */
    channelUser: ChannelUser;
    /**私聊会话相关接口 */
    userChat: UserChat;
    /**私聊消息相关接口 */
    directMessage: DirectMessage;
    /**Gateway相关接口 */
    gateway: Gateway;
    /**用户相关接口 */
    user: User;
    /**媒体模块接口 */
    asset: Asset;
    /**服务器角色相关接口 */
    guildRole: GuildRole;
    /**亲密度相关接口 */
    intimacy: Intimacy;
    /**服务器表情相关接口 */
    guildEmoji: GuildEmoji;
    /**邀请相关接口 */
    invite: Invite;
    /**黑名单相关接口 */
    blacklist: BlackList;
    /**Badge相关接口 */
    badge: Badge;
    /**在玩状态相关接口 */
    game: Game;
    /**OAuth2相关接口 */
    oauth2: OAuth2;
    constructor(webSocketClient: WebSocketClient) {
        this.webSocketClient = webSocketClient;
        this.guild = new Guild(this.webSocketClient);
        this.guildMute = new GuildMute(this.webSocketClient);
        this.guildBoost = new GuildBoost(this.webSocketClient);
        this.channel = new Channel(this.webSocketClient);
        this.channelRole = new ChannelRole(this.webSocketClient);
        this.message = new Message(this.webSocketClient);
        this.channelUser = new ChannelUser(this.webSocketClient);
        this.userChat = new UserChat(this.webSocketClient);
        this.directMessage = new DirectMessage(this.webSocketClient);
        this.gateway = new Gateway(this.webSocketClient);
        this.user = new User(this.webSocketClient);
        this.asset = new Asset(this.webSocketClient);
        this.guildRole = new GuildRole(this.webSocketClient);
        this.intimacy = new Intimacy(this.webSocketClient);
        this.guildEmoji = new GuildEmoji(this.webSocketClient);
        this.invite = new Invite(this.webSocketClient);
        this.blacklist = new BlackList(this.webSocketClient);
        this.badge = new Badge(this.webSocketClient);
        this.game = new Game(this.webSocketClient);
        this.oauth2 = new OAuth2(this.webSocketClient);
    }
}

class Guild {
    private webSocketClient: WebSocketClient;
    constructor(webSocketClient: WebSocketClient) { this.webSocketClient = webSocketClient }
    /**
     * 获取机器人加入的服务器列表
     * @returns 服务器列表
     */
    list = (): Promise<Array<IGuild>> =>
        this.webSocketClient.axios(baseUrl + 'v3/guild/list')
            .then(json => json.data.items)
    /**
     * 获取服务器详情
     * @param guild_id 服务器唯一id
     * @returns 服务器对象
     */
    view = (guild_id: string): Promise<IGuild> =>
        this.webSocketClient.axios(baseUrl + 'v3/guild/view?guild_id=' + guild_id)
            .then(json => json.data)
    /**
     * 获取服务器中的用户列表
     * @param guild_id 服务器唯一id
     * @param channel_id 指定查找的频道的id
     * @param search 搜索关键字，在用户名或昵称中搜索
     * @param role_id 角色唯一id，获取特定角色的用户列表
     * @param mobile_verified 只能为0或1，0是未认证，1是已认证
     * @param active_time 根据活跃时间排序，0是顺序排列，1是倒序排列
     * @param joined_at 根据加入时间排序，0是顺序排列，1是倒序排列
     * @param filter_user_id 获取指定 id 所属用户的信息
     * @returns 用户列表对象，包括用户数据和在线情况
     */
    user_list = async (guild_id: string, channel_id?: string, search?: string, role_id?: string, mobile_verified?: 0 | 1, active_time?: 0 | 1, joined_at?: 0 | 1, filter_user_id?: string): Promise<UserList> => {
        let url = baseUrl + 'v3/guild/user-list?guild_id=' + guild_id;
        if (channel_id != null) url += '&channel_id=' + channel_id;
        if (search != null) url += '&search=' + search;
        if (role_id != null) url += '&role_id=' + role_id;
        if (mobile_verified != null) url += '&mobile_verified=' + mobile_verified;
        if (active_time != null) url += '&active_time=' + active_time;
        if (joined_at != null) url += '&joined_at=' + joined_at;
        if (filter_user_id != null) url += '&filter_user_id=' + filter_user_id;
        const json = await this.webSocketClient.axios(url);
        return json.data;
    }
    /**
     * 修改服务器中用户的昵称
     * @param guild_id 服务器唯一id
     * @param nickname 昵称，2 - 64 长度，不传则清空昵称
     * @param user_id 要修改昵称的目标用户唯一id，不传则修改当前登陆用户的昵称
     */
    nickname = (guild_id: string, nickname?: string, user_id?: string): Promise<void> =>
        this.webSocketClient.axios('v3/guild/nickname', 'POST', [['guild_id', guild_id], ['nickname', nickname], ['user_id', user_id]])
    /**
     * 离开服务器
     * @param guild_id 服务器唯一id
     */
    leave = (guild_id: string): Promise<void> =>
        this.webSocketClient.axios('v3/guild/leave', 'POST', [['guild_id', guild_id]])
    /**
     * 
     * @param guild_id 服务器唯一id
     * @param target_id 目标用户唯一id
     */
    kickout = (guild_id: string, target_id: string): Promise<void> =>
        this.webSocketClient.axios('v3/guild/kickout', 'POST', [['guild_id', guild_id], ['target_id', target_id]])
}

class GuildMute {
    private webSocketClient: WebSocketClient;
    constructor(webSocketClient: WebSocketClient) { this.webSocketClient = webSocketClient }
}

class GuildBoost {
    private webSocketClient: WebSocketClient;
    constructor(webSocketClient: WebSocketClient) { this.webSocketClient = webSocketClient }
    /**
     * 服务器助力历史
     * @param guild_id 服务器唯一id
     * @param start_time unix 时间戳，时间范围的开始时间
     * @param end_time unix 时间戳，时间范围的结束时间
     * @returns 助力历史的列表
     */
    history = async (guild_id: string, start_time?: number, end_time?: number): Promise<Array<{ user_id: number, guild_id: number, start_time: number, end_time: number, user: IUser }>> => {
        let url = baseUrl + 'v3/guild-boost/history?guild_id=' + guild_id;
        if (start_time != null) url += '&start_time=' + start_time;
        if (end_time != null) url += '&end_time=' + end_time;
        const json = await this.webSocketClient.axios(url);
        return json.data.items;
    }
}

class Channel {
    private webSocketClient: WebSocketClient;
    constructor(webSocketClient: WebSocketClient) { this.webSocketClient = webSocketClient }
    /**
     * 获取频道列表
     * @param guild_id 服务器唯一id
     * @param type 频道类型, 1为文字，2为语音, 默认为1
     * @returns 频道列表
     */
    list = (guild_id: string, type?: 1 | 2): Promise<Array<IChannel>> =>
        this.webSocketClient.axios(baseUrl + 'v3/channel/list?guild_id=' + guild_id + '&type=' + type ?? 1)
            .then(json => json.data.items)
    /**
     * 获取频道详情
     * @param target_id 频道唯一id
     * @param need_children 是否需要获取子频道，默认为false
     * @returns 频道对象
     */
    view = (target_id: string, need_children?: boolean): Promise<IChannel> =>
        this.webSocketClient.axios(baseUrl + 'v3/channel/view?target_id=' + target_id + '&need_children=' + need_children ?? false)
            .then(json => json.data)
    /**
     * 创建频道
     * @param guild_id 服务器唯一id
     * @param name 频道名称
     * @param parent_id 父分组 id
     * @param type 频道类型，1 文字，2 语音，默认为 1
     * @param limit_amount 语音频道人数限制，最大 99
     * @param voice_quality 语音音质，默认为2。1流畅，2正常，3高质量
     * @param is_category 是否是分组，默认为 0。1 是，0 否。当该值传 1 时，只接收 {@link guild_id}、{@link name}、{@link is_category} 三个字段！
     * @returns 创建成功的频道对象
     */
    create = (guild_id: string, name: string, parent_id?: string, type?: 0 | 1, limit_amount?: number, voice_quality?: 1 | 2 | 3, is_category?: boolean): Promise<IChannel> =>
        this.webSocketClient.axios(baseUrl + 'v3/channel/create', 'POST', [['guild_id', guild_id], ['name', name], ['parent_id', parent_id], ['type', type?.toString()], ['limit_amount', limit_amount?.toString()], ['voice_quality', voice_quality?.toString()], ['is_category', is_category?.toString()]])
            .then(json => json.data)
    /**
     * 编辑频道（某位懒得做校验的人写的，我不说是谁）
     * @param channel_id 频道唯一id
     * @param name 频道名称
     * @param level 频道排序
     * @param parent_id 分组频道 ID，设置为 0 为移出分组
     * @param topic 频道简介，文字频道有效
     * @param slow_mode 慢速模式，单位 ms。目前只支持这些值：0, 5000, 10000, 15000, 30000, 60000, 120000, 300000, 600000, 900000, 1800000, 3600000, 7200000, 21600000，文字频道有效
     * @param limit_amount 此频道最大能容纳的用户数量，最大值 99，语音频道有效
     * @param voice_quality 声音质量，1 流畅，2 正常，3 高质量，语音频道有效
     * @param password 密码，语音频道有效
     * @returns 更改后的频道对象
     */
    update = (channel_id: string, name?: string, level?: number, parent_id?: string, topic?: string, slow_mode?: 0 | 5000 | 10000 | 15000 | 30000 | 60000 | 120000 | 300000 | 600000 | 900000 | 1800000 | 3600000 | 7200000 | 21600000, limit_amount?: number, voice_quality?: 1 | 2 | 3, password?: string): Promise<IChannel> =>
        this.webSocketClient.axios(baseUrl + 'v3/channel/create', 'POST', [['channel_id', channel_id], ['name', name], ['level', level?.toString()], ['parent_id', parent_id], ['topic', topic], ['slow_mode', slow_mode?.toString()], ['limit_amount', limit_amount?.toString()], ['voice_quality', voice_quality?.toString()], ['password', password]])
            .then(json => json.data)
    /**
     * 编辑文字频道
     * 
     * {@link update} 的一坨太难看了，这个是简化版本，参数说明去那里看
     */
    updateTextChannel = (channel_id: string, name?: string, level?: number, parent_id?: string, topic?: string, slow_mode?: 0 | 5000 | 10000 | 15000 | 30000 | 60000 | 120000 | 300000 | 600000 | 900000 | 1800000 | 3600000 | 7200000 | 21600000): Promise<IChannel> => this.update(channel_id, name, level, parent_id, topic, slow_mode, undefined, undefined, undefined)
    /**
     * 编辑语音频道
     * 
     * {@link update} 的一坨太难看了，这个是简化版本，参数说明去那里看
     */
    updateVoiceChannel = (channel_id: string, name?: string, level?: number, parent_id?: string, limit_amount?: number, voice_quality?: 1 | 2 | 3, password?: string): Promise<IChannel> => this.update(channel_id, name, level, parent_id, undefined, undefined, limit_amount, voice_quality, password)
    /**
     * 删除频道
     * @param channel_id 频道唯一id
     */
    delete = (channel_id: string): Promise<void> =>
        this.webSocketClient.axios(baseUrl + 'v3/channel/delete', 'POST', [['channel_id', channel_id]])
    /**
     * 语音频道用户列表
     * @param channel_id 频道唯一id
     * @returns 用户对象列表
     */
    userList = (channel_id: string): Promise<Array<IUser>> =>
        this.webSocketClient.axios(baseUrl + 'v3/channel/user-list?channel_id=' + channel_id)
            .then(json => json.data)
    /**
     * 语音频道之间移动用户（Not complete yet）
     * 
     * 只能在语音频道之间移动，用户也必须在其他语音频道在线才能够移动到目标频道。
     * @param target_id 目标频道唯一id, 需要是语音频道
     * @param user_ids 用户 id 的数组
     */
    moveUser = (target_id: string, user_ids: Array<string>): void => {

    }
}

class ChannelRole {
    private webSocketClient: WebSocketClient;
    constructor(webSocketClient: WebSocketClient) { this.webSocketClient = webSocketClient }

}

class Message {
    private webSocketClient: WebSocketClient;
    constructor(webSocketClient: WebSocketClient) { this.webSocketClient = webSocketClient }
}

class ChannelUser {
    private webSocketClient: WebSocketClient;
    constructor(webSocketClient: WebSocketClient) { this.webSocketClient = webSocketClient }

}

class UserChat {
    private webSocketClient: WebSocketClient;
    constructor(webSocketClient: WebSocketClient) { this.webSocketClient = webSocketClient }

}

class DirectMessage {
    private webSocketClient: WebSocketClient;
    constructor(webSocketClient: WebSocketClient) { this.webSocketClient = webSocketClient }

}

class Gateway {
    private webSocketClient: WebSocketClient;
    constructor(webSocketClient: WebSocketClient) { this.webSocketClient = webSocketClient }
    /**
     * 获取网关的连接地址
     * @param compress 数据是否压缩，1为压缩（sdk不负责解压）
     * @returns 网关URL
     */
    index = async (compress: 0 | 1): Promise<string> =>
        this.webSocketClient.axios(baseUrl + 'v3/gateway/index?compress=' + compress)
            .then(json => json.data.url)
}

class User {
    private webSocketClient: WebSocketClient;
    constructor(webSocketClient: WebSocketClient) { this.webSocketClient = webSocketClient }

}

class Asset {
    private webSocketClient: WebSocketClient;
    constructor(webSocketClient: WebSocketClient) { this.webSocketClient = webSocketClient }

}

class GuildRole {
    private webSocketClient: WebSocketClient;
    constructor(webSocketClient: WebSocketClient) { this.webSocketClient = webSocketClient }

}

class Intimacy {
    private webSocketClient: WebSocketClient;
    constructor(webSocketClient: WebSocketClient) { this.webSocketClient = webSocketClient }

}

class GuildEmoji {
    private webSocketClient: WebSocketClient;
    constructor(webSocketClient: WebSocketClient) { this.webSocketClient = webSocketClient }

}

class Invite {
    private webSocketClient: WebSocketClient;
    constructor(webSocketClient: WebSocketClient) { this.webSocketClient = webSocketClient }

}

class BlackList {
    private webSocketClient: WebSocketClient;
    constructor(webSocketClient: WebSocketClient) { this.webSocketClient = webSocketClient }

}

class Badge {
    private webSocketClient: WebSocketClient;
    constructor(webSocketClient: WebSocketClient) { this.webSocketClient = webSocketClient }

}

class Game {
    private webSocketClient: WebSocketClient;
    constructor(webSocketClient: WebSocketClient) { this.webSocketClient = webSocketClient }

}

class OAuth2 {
    private webSocketClient: WebSocketClient;
    constructor(webSocketClient: WebSocketClient) { this.webSocketClient = webSocketClient }
    /**
     * 获取AccessToken
     * @param client_id 当前 OAuth 客户端的 client_id, 可在机器人详情页查看
     * @param client_secret 当前 OAuth 客户端的 client_secret, 可在机器人详情页查看
     * @param code 用户授权成功回调后获得的 authorization_code
     * @param redirect_uri 本次授权所使用的回调地址 (需为机器人 OAuth 配置白名单中的地址)
     */
    token = (client_id: string, client_secret: string, code: string, redirect_uri: string): Promise<{ access_token: string, expires_in: number, token_type: string, scope: string }> =>
        this.webSocketClient.axios(baseUrl + 'oauth2/token', 'POST', [['grant_type', 'authorization_code'], ['client_id', client_id], ['client_secret', client_secret], ['code', code], ['redirect_uri', redirect_uri]])
}