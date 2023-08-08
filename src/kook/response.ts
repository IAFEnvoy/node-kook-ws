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