import { Email } from "@/interfaces/UserForm";

export interface UserInfoBasic {
    name: string,
    phone: string,
    birthday: string,
    address: Address
}
export interface UserInfo extends UserInfoBasic {
    email: Email,
    _id: string,
    createdAt: string | Date,
    updatedAt: string | Date,
    id?: string,
    verificationToken?: string
}

export interface Address {
    zipcode: number,
    detail: string,
    county?: string,
    city?: string
}