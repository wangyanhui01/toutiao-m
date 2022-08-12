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

// 关注用户
export const addFollow = target => {
    return request ({
        method:'POST',
        url:'v1_0/user/followings',
        data:{
            target
        }
    })
}

// 取消关注用户
export const deleteFollow = target => {
    return request ({
        method:'DELETE',
        url:`v1_0/user/followings/${target}`
    })
}

// 取消当前登陆用户的个人资料
export const getUserProfile = () => {
    return request ({
        method:'GET',
        url:'v1_0/user/profile'
    })
}


// 修改当前登陆用户的个人资料
export const updateUserProfile = (data) => {
    return request ({
        method:'PATCH',
        url:'v1_0/user/profile',
        data
    })
}

// 更新用户头像
export const updateUserPhoto = (data) => {
    return request ({
        method:'PATCH',
        url:'v1_0/user/photo',
        data
    })
}