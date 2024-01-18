export interface UserInfo {
    address: Address,
    _id: string,
    name: string,
    email: string,
    phone: string,
    birthday: string | Date,
    createdAt: string | Date,
    updatedAt: string | Date,
    id: string
}

export interface Address {
    zipcode: number,
    detail: string,
    county: string,
    city: string
}


