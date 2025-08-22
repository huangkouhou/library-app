import { useEffect, useState } from 'react';
import BookModel from '../../models/BookModel';
import { SpinnerLoading } from '../Utils/SpinnerLoading';
import { SearchBook } from './components/SearchBook';
import { Pagination } from '../Utils/Pagination';

export const SearchBooksPage = () => {

    // ① 在组件顶层定义状态
    const [books, setBooks] = useState<BookModel[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [booksPerPage] = useState(5);
    const [totalAmountOfBooks, setTotalAmountOfBooks] = useState(0);
    const [totalPages, setTotalPages] = useState(0);


    // ② 在 useEffect 里，根据“依赖数组”去更新状态
    useEffect(() => {//useEffect(() => { ... }, ...) 的回调函数，写副作用逻辑（取数、订阅、定时器等）。
        const fetchBooks = async() => {
            const baseUrl: string = "http://localhost:8080/api/books";

            const url: string = `${baseUrl}?page=${currentPage - 1}&size=${booksPerPage}`;

            const response = await fetch(url);

            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            const responseJson = await response.json();

            const responseData = responseJson._embedded.books;

            setTotalAmountOfBooks(responseJson.page.totalElements);
            setTotalPages(responseJson.page.totalPages);

            //把变量类型标成“BookModel 的数组”。也就是数组里的每个元素都必须是 BookModel 类型。
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
        //跳到页面顶部
        window.scrollTo(0, 0);
    }, [currentPage]); //[...] 依赖数组，决定何时运行：只在首次挂载运行一次；[a, b]：当 a 或 b 变化时运行。省略 []：每次渲染后都运行（少用）。

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

    //indexOfLastBook 是当前页在数组中的结束下标（slice 的右开界）indexOfFirstBook 是当前页在数组中的开始下标（slice 的左闭界）
    const indexOfLastBook: number = currentPage * booksPerPage;
    const indexOfFirstBook: number = indexOfLastBook - booksPerPage;
    let lastItem = booksPerPage * currentPage <= totalAmountOfBooks ?
        booksPerPage * currentPage : totalAmountOfBooks;


    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    return (
        <div>
            <div className='container'>
                <div className='row mt-5'>
                    <div className='col-6'>
                        <div className='d-flex'>
                            <input className='form-control me-2' type='search'
                                placeholder='Search' aria-labelledby='Search'/>
                            <button className='btn btn-outline-success'>
                                Search
                            </button>
                        </div>
                    </div>
                    <div className='col-4'>
                        <div className='dropdown'>
                            <button className='btn btn-secondary dropdown-toggle' type='button'
                                id='dropdownMenuButton1' data-bs-toggle='dropdown'
                                aria-expanded='false'>
                                Category    
                            </button>
                            <ul className='dropdown-menu' aria-labelledby='dropdownMenuButton1'>
                                <li>
                                    <a className='dropdown-item' href='#'>
                                        ALL
                                    </a>
                                </li>
                                <li>
                                    <a className='dropdown-item' href='#'>
                                        Front End
                                    </a>
                                </li>
                                <li>
                                    <a className='dropdown-item' href='#'>
                                        Back End
                                    </a>
                                </li>
                                <li>
                                    <a className='dropdown-item' href='#'>
                                        Data
                                    </a>
                                </li>
                                <li>
                                    <a className='dropdown-item' href='#'>
                                        DevOps
                                    </a>
                                </li>                                
                            </ul>
                        </div>
                    </div>
                    <div className='mt-3'>
                        <h5>Number of results: ({totalAmountOfBooks})</h5>
                    </div>
                    <p>
                        {indexOfFirstBook + 1} to {lastItem} of {totalAmountOfBooks} items:
                    </p>
                    {/*book={book}：把当前这本书对象作为 props 传给子组件 SearchBook，所以在 SearchBook 里可以通过 props.book 拿到它。*/}
                    {books.map(book => (
                        <SearchBook book={book} key={book.id}/>
                    ))}
                    {/*Only render <Pagination> if totalPages > 1 */}
                    {totalPages > 1 &&
                        <Pagination currentPage={currentPage} totalPages={totalPages} paginate={paginate}/>
                    }
                </div>
            </div>
        </div>
    );
}