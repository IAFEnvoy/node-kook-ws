/**用户数据的抽象接口 */
interface IUser {
    /**用户的唯一id，可用来标记用户 */
    id: string,
    /**用户的名称 */
    username: string,
    /**用户在当前服务器的昵称，如果不存在则为空，此时应当使用{@link username}*/
    nickname?: string,
    /**用户名的认证数字，用户名正常为：{@link username}#{@link identify_num} */
    identify_num: string,
    /**当前是否在线 */
    online: boolean,
    /**是否为机器人 */
    bot: boolean,
    /**用户的状态, 0 和 1 代表正常，10 代表被封禁 */
    status: 0 | 1 | 10,
    /**	用户的头像的 url 地址 */
    avatar: string,
    /**vip 用户的头像的 url 地址，可能为 gif 动图 */
    vip_avatar: string,
    /**是否手机号已验证 */
    mobile_verified: boolean,
    /**用户在当前服务器中的角色 id 组成的列表 */
    roles: Array<number>
}
/**服务器数据的抽象接口 */
interface IGuild {
    /**服务器的唯一id，可用来标记服务器 */
    id: string,
    /**服务器名称 */
    name: string,
    /**服务器主题 */
    topic: string,
    /**服务器主的 id */
    user_id: string,
    /**服务器 icon 的地址 */
    icon: string,
    /**通知类型, 0代表默认使用服务器通知设置，1代表接收所有通知, 2代表仅@被提及，3代表不接收通知 */
    notify_type: 0 | 1 | 2 | 3,
    /**服务器默认使用语音区域 */
    region: string,
    /**是否为公开服务器 */
    enable_open: boolean,
    /**公开服务器 id */
    open_id: string,
    /**公开服务器 id */
    default_channel_id: string,
    /**欢迎频道 id */
    welcome_channel_id: string,
    /**欢迎频道 */
    roles: Array<number>,
    /**频道列表 */
    channels: Array<number>
}
/**角色数据的抽象接口 */
interface IRole {
    /**角色的唯一id，可用来标记角色 */
    role_id: number,
    /**角色名称 */
    name: string,
    /**颜色色值 */
    color: number,
    /**顺序位置 */
    position: number,
    /**是否为角色设定(与普通成员分开显示) */
    hoist: 0 | 1,
    /**是否允许任何人 @ 提及此角色 */
    mentionable: 0 | 1,
    /**权限码 */
    permissions: number
}
/**频道数据的抽象接口 */
interface IChannel {
    /**频道的唯一id，可用来标记频道 */
    id: string,
    /**频道名称 */
    name: string,
    /**创建者 id */
    user_id: string,
    /**服务器 id */
    guild_id: string,
    /**频道简介 */
    topic: string,
    /**是否为分组，事件中为 int 格式 */
    is_category: boolean,
    /**上级分组的 id (若没有则为 0 或空字符串) */
    parent_id: string,
    /**排序 level */
    level: number,
    /**慢速模式下限制发言的最短时间间隔, 单位为秒(s) */
    slow_mode: number,
    /**频道类型: 1 文字频道, 2 语音频道 */
    type: 1 | 2,
    /**针对角色在该频道的权限覆写规则组成的列表 */
    permission_overwrites: Array<IRolePermissionOverwrite>,
    /**针对用户在该频道的权限覆写规则组成的列表 */
    permission_users: Array<IUserPermissionOverwrite>,
    /**权限设置是否与分组同步, 1 or 0 */
    permission_sync: 0 | 1,
    /**是否有密码 */
    has_password: boolean
}
interface IRolePermissionOverwrite {
    role_id: number,
    allow: number,
    deny: number
}
interface IUserPermissionOverwrite {
    user: IUser,
    allow: number,
    deny: number
}
/**引用消息的抽象接口 */
interface IQuote {
    /**引用消息的唯一id */
    id: string,
    /**引用消息类型 */
    type: number,
    /**引用消息类型 */
    content: string,
    /**引用消息创建时间（毫秒） */
    create_at: number,
    /**作者的用户信息 */
    author: IUser
}
/**附加的多媒体数据的抽象接口 */
interface IAttachment {
    /**多媒体类型 */
    type: string,
    /**多媒体地址 */
    url: string,
    /**多媒体名 */
    name: string,
    /**大小 单位 Byte */
    size: number
}