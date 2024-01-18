interface FormSchema {
    [name: string]: {
        name: string,
        label: string,
        type: 'email' | 'password' | 'text',
        as: 'input' | 'password',
        placeholder: string,
        help?: string
    }
}

export const formSchema: FormSchema = {
    emailSchema: {
        name: "email",
        label: "電子信箱",
        type: "email",
        as: "input",
        placeholder: 'hello@exsample.com'
    },
    passwordSchema: {
        name: "password",
        label: "密碼",
        type: "password",
        as: "input",
        help: "密碼為 8 碼以上英數混合",
        placeholder: '請輸入密碼'
    },
    confirmPasswordSchema: {
        name: "confirmPassword",
        label: "確認密碼",
        type: "password",
        as: "input",
        placeholder: '請再輸入一次密碼'
    },
    // userNameSchema: {
    //     name: "userName",
    //     label: "名字",
    //     type: "text",
    //     as: "input",
    //     rules: "required|max:10",
    //     isRequired: true
    // }
};