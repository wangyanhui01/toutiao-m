import request from "@/utils/request";


// 获取文章评论列表
export const getComment = (params) => {
    return request ({
        method:'GET',
        url:'v1_0/comments',
        params
    })
}

// 评论点赞
export const addCommentLike = (target) => {
    return request ({
        method:'POST',
        url:'v1_0/comment/likings',
        data:{
            target
        }
    })
}
// 取消评论点赞
export const deleteCommentLike = (target) => {
    return request ({
        method:'DELETE',
        url:`v1_0/comment/likings/${target}`,
    })
}

// 对文章或者评论进行评论
export const addComment = (data) => {
    return request ({
        method:'POST',
        url:'v1_0/comments',
        data
    })
}