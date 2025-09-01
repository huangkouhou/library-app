//ReviewModel: 代表一个完整的、已存在于数据库中的评论的完整数据结构。它是一个**“实体”或“完整数据”模型**。
class ReviewModel {
    id: number;
    userEmail: string;
    date: string;
    rating: number;
    book_id: number;
    reviewDescription?: string;

    constructor(id: number, userEmail: string, date: string, 
        rating: number, book_id: number, reviewDescription: string) {

        this.id = id;
        this.userEmail = userEmail; 
        this.date = date;           
        this.rating = rating;
        this.book_id = book_id;
        this.reviewDescription = reviewDescription;
    }
}

export default ReviewModel;