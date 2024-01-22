import { UserInfoBasic } from "@/interfaces/User";
import { Room } from "@/interfaces/Room";

export interface BasicOrder {
    checkInDate: Date | string;
    checkOutDate: Date | string;
    peopleNum: number;
    userInfo: UserInfoBasic;
}

export interface OrderDetail extends BasicOrder {
    _id: string;
    roomId: Room;
    orderUserId: string;
    status: -1 | 0; // -1 表示訂單取消
    createdAt: Date;
    updatedAt: Date;
}