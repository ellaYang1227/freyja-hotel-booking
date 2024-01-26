export interface FormSchema {
    [name: string]: {
        name: string,
        label: string,
        type?: "email" | "password" | "text" | "date",
        as: "input" | "password" | "select",
        placeholder?: string,
        help?: string,
        maxlength?: number
    }
}

export const formSchema: FormSchema = {
    emailSchema: {
        name: "email",
        label: "電子信箱",
        type: "email",
        as: "input",
        placeholder: "hello@exsample.com"
    },
    passwordSchema: {
        name: "password",
        label: "密碼",
        type: "password",
        as: "input",
        placeholder: "請輸入密碼"
    },
    oldPasswordSchema: {
        name: "oldPassword",
        label: "舊密碼",
        type: "password",
        as: "input",
        placeholder: "請輸入舊密碼"
    },
    newPasswordSchema: {
        name: "newPassword",
        label: "新密碼",
        type: "password",
        as: "input",
        placeholder: "請輸入新密碼"
    },
    confirmPasswordSchema: {
        name: "confirmPassword",
        label: "確認密碼",
        type: "password",
        as: "input",
        placeholder: "請再輸入一次密碼"
    },
    nameSchema: {
        name: "name",
        label: "姓名",
        type: "text",
        as: "input",
        placeholder: "請輸入姓名",
        maxlength: 10
    },
    phoneSchema: {
        name: "phone",
        label: "手機號碼",
        type: "text",
        as: "input",
        placeholder: "請輸入手機號碼",
        maxlength: 10
    },
    birthdaySchema_year: {
        name: "year",
        label: "生日",
        as: "select"
    },
    birthdaySchema_month: {
        name: "month",
        label: "生日",
        as: "select"
    },
    birthdaySchema_day: {
        name: "day",
        label: "生日",
        as: "select"
    },
    addressSchema_zipcode: {
        name: "zipcode",
        label: "地址",
        as: "select"
    },
    addressSchema_detail: {
        name: "detail",
        label: "地址",
        type: "text",
        as: "input",
        placeholder: "請輸入詳細地址"
    },
    codeSchema: {
        name: "code",
        label: "驗證碼",
        type: "text",
        as: "input",
        placeholder: "請輸入驗證碼"
    }
};