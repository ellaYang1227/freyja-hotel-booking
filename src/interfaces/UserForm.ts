import { UserInfoBasic } from "@/interfaces/User";

export type Email = string;
export type UserId = string;
export type Password = string;

export interface LoginForm {
    email: Email,
    password: Password
}

export interface RegisterStep1Form extends LoginForm {
    confirmPassword: string
}

export interface RegisterForm extends LoginForm, UserInfoBasic {
}

export interface ChangePasswordForm {
    userId: UserId,
    oldPassword: Password,
    newPassword: Password,
    confirmPassword?: Password
}

export interface EditMyInfoForm extends UserInfoBasic {
    userId: UserId
}

export interface ForgotForm {
    email: Email,
    code: string,
    newPassword: Password
}