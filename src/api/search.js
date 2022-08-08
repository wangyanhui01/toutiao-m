import request from "@/utils/request";
// import store from '@/store/index'
// 获取搜索建议
export const getSearchSuggestion = q => {
    return request ({
        method:'GET',
        url:'v1_0/suggestion',
        params:{
            q
        }
    })
}

// 获取搜索结果
export const getSearchResult = params => {
    return request ({
        method:'GET',
        url:'v1_0/search',
        params
    })
}