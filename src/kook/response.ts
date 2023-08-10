import { IUser } from "./objects";

export interface UserList {
    /**用户数量 */
    user_count: number,
    /**在线用户数量 */
    online_count: number,
    /**离线用户数量 */
    offline_count: number,
    /**用户列表 */
    items: Array<IUser>
}

/**v3/user/me的返回对象 */
export interface UserMe extends IUser {
    /**当前连接方式 */
    os: string,
    /**用户的横幅的 url 地址 */
    banner: string,
    /**手机区号,如中国为 86 */
    mobile_prefix: string,
    /**用户手机号，带掩码 */
    mobile: string,
    /**当前邀请注册的人数 */
    invited_count: number
}

/**v3/user/view的返回对象 */
export interface UserEx extends IUser {
    /**是否为会员 */
    is_vip: boolean,
    /**加入服务器时间 */
    joined_at: number,
    /**活跃时间 */
    active_time: number
}

/**v3/guild-role/grant和v3/guild-role/revoke的返回对象 */
export interface RoleChange {
    /**用户唯一id */
    user_id: string,
    /**服务器唯一id */
    guild_id: string,
    /**修改后的角色列表 */
    roles: Array<number>
}