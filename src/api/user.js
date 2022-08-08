import request from "@/utils/request";
// import store from '@/store/index'
// 登陆注册接口
export const login = data => {
    return request ({
        method:'POST',
        url:'v1_0/authorizations',
        data
    })
}

// 获取短信验证码接口  注意:每个手机号 每分钟只能收到一次
export const sendSms = mobile => {
    return request ({
        method:'GET',
        url:`v1_0/sms/codes/${mobile}`,
    })
}

// 获取用户自己的信息
export const getUserInfo = () => {
    return request ({
        method:'GET',
        url:'v1_0/user'
        // headers:{
        //     Authorization: `Bearer ${store.state.user.token}`
        // }
    })
}


// 获取频道列表
export const getUserChannels = () => {
    return request ({
        method:'GET',
        url:'v1_0/user/channels'
    })
}