import request from "@/utils/request";
// import store from '@/store/index'
// 获取所有频道
export const GetAllChannel = data => {
    return request ({
        method:'GET',
        url:'v1_0/channels',
        data
    })
}

// 添加用户频道
export const addUserChannel = channel => {
    return request ({
        method:'PATCH',
        url:'v1_0/user/channels',
        data:{
            channels:[channel]
        }
    })
}

// 删除用户频指定道
export const deleteUserChannel = channelId => {
    return request ({
        method:'DELETE',
        url:`v1_0/user/channels/${channelId}`,
    })
}