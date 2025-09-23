class AddBookRequest {
    title: string;
    author: string;
    description: string;
    copies: number;
    category: string;
    img?: string;//可选属性通常不是创建对象时必须提供的参数。

    constructor(title: string, author: string, description: string, copies: number, category: string){
        this.title = title;
        this.author = author;
        this.description = description;
        this.copies = copies;
        this.category = category;
    }
}

export default AddBookRequest;