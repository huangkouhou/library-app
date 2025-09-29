import { ReturnBook } from "./ReturnBook";
import { useEffect, useState } from 'react';
import BookModel from "../../../models/BookModel";
import { SpinnerLoading } from "../../Utils/SpinnerLoading";
import { Link } from "react-router-dom";

export const Carousel = () => {
    // ① 在组件顶层定义状态
    const [books, setBooks] = useState<BookModel[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);

    // ② 在 useEffect 里，根据“依赖数组”去更新状态
    useEffect(() => {//useEffect(() => { ... }, ...) 的回调函数，写副作用逻辑（取数、订阅、定时器等）。
        const fetchBooks = async() => {
            const baseUrl: string = `${process.env.REACT_APP_API}/books`;

            const url: string = `${baseUrl}?page=0&size=9`;

            const response = await fetch(url);

            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            const responseJson = await response.json();

            const responseData = responseJson._embedded.books;

            const loadedBooks: BookModel[] = [];

            for (const key in responseData){
                loadedBooks.push({
                    id: responseData[key].id,
                    title: responseData[key].title,
                    author: responseData[key].author,
                    description: responseData[key].description,
                    copies: responseData[key].copies,
                    copiesAvailable: responseData[key].copiesAvailable,
                    category: responseData[key].category,
                    img: responseData[key].img,
                });
            }

            setBooks(loadedBooks);
            setIsLoading(false);
        };
        fetchBooks().catch((error:any) => {
            setIsLoading(false);
            setHttpError(error.message);
        })
    }, []); //[...] 依赖数组，决定何时运行：只在首次挂载运行一次；[a, b]：当 a 或 b 变化时运行。省略 []：每次渲染后都运行（少用）。

    if (isLoading){
        return (
            <SpinnerLoading />
        )
    }

    if (httpError){
        return (
            <div className="container m-5">
                <p>{httpError}</p>
            </div>
        )
    }

    return (
        <div className="container mt-5" style={{ height: 550 }}>
            <div className="homepage-carousel-title">
                <h3>Find your next "I stayed up too late reading" book.</h3>
            </div>
            <div id='carouselExampleControls' className="carousel carousel-dark slide mt-5
                d-none d-lg-block" data-bs-interval='false'>

                {/* Desktop */}
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <div className="row d-flex justify-content-center align-items-center">
                            {books.slice(0, 3).map(book => (
                                <ReturnBook book={book} key = {book.id} />
                            ))}
                        </div>
                    </div>


                    <div className="carousel-item">
                        <div className="row d-flex justify-content-center align-items-center">
                            {books.slice(3, 6).map(book => (
                                <ReturnBook book={book} key = {book.id} />
                            ))}
                        </div>
                    </div>

                    <div className="carousel-item">
                        <div className="row d-flex justify-content-center align-items-center">
                            {books.slice(6, 9).map(book => (
                                <ReturnBook book={book} key = {book.id} />
                            ))}
                        </div>
                    </div>

                    </div>

                    <button className="carousel-control-prev" type='button'
                        data-bs-target='#carouselExampleControls' data-bs-slide='prev'>
                            <span className="carousel-control-prev-icon" aria-hidden='true'></span>
                            <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type='button'
                        data-bs-target='#carouselExampleControls' data-bs-slide='next'>
                            <span className="carousel-control-next-icon" aria-hidden='true'></span>
                            <span className="visually-hidden">Next</span>
                    </button>
                </div>

                {/* Mobile */}
                <div className="d-lg-none mt-3">
                    <div className="row d-flex justify-content-center align-items-center">
                        <ReturnBook book={books[7]} key={books[7].id} />
                    </div>
                </div>
                <div className="homepage-carousel-title mt-3">
                    <Link className="btn btn-outline-secondary btn-lg" to='/search'>View More</Link>
                </div>
            </div>
        
    );
}

// 用 Link：只是跳转，不需要“选中态”样式（例如详情页里的“返回列表”）。
// 用 NavLink：需要根据当前路由高亮/标记（导航栏、侧边栏、分页按钮、Tab）。