//ReviewRequestModel: 代表用户提交新评论时，从前端发送给后端的数据结构。它是一个**“请求”模型**。
class ReviewRequestModel {
    rating: number;
    bookId: number;
    reviewDescription?: string;

    constructor(rating:number, bookId: number, reviewDescription: string) {
        this.rating = rating;
        this.bookId = bookId;
        this.reviewDescription = reviewDescription;   
    }
}

export default ReviewRequestModel;

//用户提供的信息。 关键缺失字段	没有 id, userEmail, date。 使用位置(后端)	Controller 的 @RequestBody 参数	。 使用位置(前端)	表单 (Form) 的数据模型
//看到类名中带有 Request, DTO (Data Transfer Object), Payload 等后缀时，就要立刻想到：“啊，这个是用来在不同系统层之间传递数据用的，很可能不是完整的数据模型。”