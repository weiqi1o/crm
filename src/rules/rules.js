export const verificationRules = {
    name: [
        'name',
        {
            rules: [{required: true, message: '请填写名称!', whitespace: true}],
        },
    ],
    email: [
        'email',
        {
            rules: [
                {
                    type: 'email',
                    message: '这不是一个电子邮箱地址!',
                },
                {
                    required: true,
                    message: '请填写电子邮箱!',
                },
            ],
        },
    ],
    phone: [
        'phone',
        {
            rules: [{required: true, message: '请填写手机号码!'}],
        },
    ],
    prefix:[
        'prefix',
        { initialValue: '86' }
    ],
    headPortrait: [
        'headPortrait',
        {
            initialValue: '',
        }
    ],
    password: [
        'password',
        {
            rules: [
                {
                    required: true,
                    message: '请填写密码!',
                },
                {
                    validator: validateToNextPassword,
                },
            ],
        }
    ],
    confirm: [
        'confirm',
        {
            rules: [
                {
                    required: true,
                    message: '请确认密码!',
                },
                {
                    validator: compareToFirstPassword,
                },
            ],
        },
    ],
    creator: [
        'creator',
        {
            rules: [{required: true, message: '请填写创建者!', whitespace: true}],
        },
    ],
    datePicker: [
        'datePicker',
        {
            rules: [{type: 'object', required: true, message: '请填写出愿时间!'}]
        }
    ],
    major: [
        'major',
        {
            rules: [{required: true, message: '请填写专业!', whitespace: true}],
        },
    ],
    project: [
        'project',
        {
            rules: [{required: true, message: '请填写所报项目!', whitespace: true}],
        }
    ],
    school: [
        'school',
        {
            rules: [{required: true, message: '请填写期望院校!', whitespace: true}],
        },
    ],
    remark: ['remark'],
    status: [
        'status',
        {
            rules: [{required: true, message: '请填选择状态!', whitespace: true}],
        }
    ],
}

export const compareToFirstPassword = (rule, value, callback) =>{
    const form = this.form;
    if (value && value !== form.getFieldValue('password')) {
        callback('两个密码不一致');
    } else {
        callback();
    }
}

export const validateToNextPassword = (rule, value, callback) =>{
        const form = this.form;
        if (value && this.confirmDirty) {
            form.validateFields(['confirm'], {force: true});
        }
        callback();
}
