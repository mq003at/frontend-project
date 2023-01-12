import { Product } from "./common"

export interface User {
    id: number 
    email: string
    password: string
    name: string
    role: "admin" | "customer"
    avatar: string
    creationAt?: string,
    updatedAt?: string
}

export interface UserReducer{
    userList: User[]
    currentUser?: User
    session?: SessionCredential
    specialOffers?: Product[]
    isAvailable?: boolean
    registerSuccess?: boolean
}

export interface AccountCredential {
    email: string
    password: string
}

export interface SessionCredential {
    access_token: string,
    refresh_token: string
}