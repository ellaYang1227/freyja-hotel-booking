interface Rules {
    required: string,
    full: (value: string) => string | true
}

interface FormSchema {
    [name: string]: {
        name: string,
        label: string,
        type: 'email' | 'password' | 'text',
        as: 'input' | 'password',
        rules: any,
        isRequired: boolean,
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
        rules: "email|required",
        isRequired: true,
        placeholder: 'hello@exsample.com'
    },
    passwordSchema: {
        name: "password",
        label: "密碼",
        type: "password",
        as: "input",
        rules: {
            required: "required",
            full: (value: string) => {
                const pattern = /^(?=.*[0-9])(?=.*[a-zA-Z]).{8,}$/;
                return pattern.test(value) ? true : "密碼為必填，至少 8 碼以上英數混合";
            }
        },
        isRequired: true,
        help: "密碼為 8 碼以上英數混合",
        placeholder: '請輸入密碼'
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