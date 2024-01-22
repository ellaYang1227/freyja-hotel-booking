import { UserInfoBasic } from "@/interfaces/User";

export type Email = string;

export interface LoginForm {
    email: Email,
    password: string
}

export interface RegisterStep1Form extends LoginForm {
    confirmPassword: string
}

export interface RegisterForm extends LoginForm, UserInfoBasic {
}