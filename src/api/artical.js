import request from "@/utils/request";
// 获取文章新闻推荐
export const getArticals = params => {
    return request ({
        method:'GET',
        url:'v1_0/articles',
        params
    })
}

