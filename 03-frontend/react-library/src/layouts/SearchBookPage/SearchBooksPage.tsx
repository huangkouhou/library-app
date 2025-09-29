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
    const [search, setSearch] = useState('');
    const [searchUrl, setSearchUrl] = useState('');
    const [categorySelection, setCategorySelection] = useState('Book category');


    // ② 在 useEffect 里，根据“依赖数组”去更新状态
    useEffect(() => {//useEffect(() => { ... }, ...) 的回调函数，写副作用逻辑（取数、订阅、定时器等）。
        const fetchBooks = async() => {
            const baseUrl: string = `${process.env.REACT_APP_API}/books`;

            let url: string = '';

            if (searchUrl === ''){
                url = `${baseUrl}?page=${currentPage - 1}&size=${booksPerPage}`;
            } else {
                // 搜索列表，把占位符<pageNumber>替换成真正的页码
                let searchWithPage = searchUrl.replace('<pageNumber>', `${currentPage - 1}`)//后面真正发请求前，会把它替换成当前页（currentPage - 1，因为后端分页从 0 开始）。
                url = baseUrl + searchWithPage;
            }

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
    }, [currentPage, searchUrl]); //[...] 依赖数组，决定何时运行：只在首次挂载运行一次；[a, b]：当 a 或 b 变化时运行。省略 []：每次渲染后都运行（少用）。

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

    //find by title function(in the placeholder)
    const searchHandleChange = () => {
        setCurrentPage(1);
        if (search === ''){
            setSearchUrl('');
        } else {
            //if we set the page=0 here, if there's more than one page for a search or a category, it will just show the same thing on each Pagination page
            //change the page=0 to page=<pageNumber>
            setSearchUrl(`/search/findByTitleContaining?title=${search}&page=<pageNumber>&size=${booksPerPage}`)
        }
        setCategorySelection('Book category')
    }

    //find by category function
    const categoryField = (value: string) => {
        setCurrentPage(1);
        if (
            value.toLocaleLowerCase() === 'fe' ||
            value.toLocaleLowerCase() === 'be' ||
            value.toLocaleLowerCase() === 'data' ||
            value.toLocaleLowerCase() === 'devops'
        ){
            setCategorySelection(value);
            setSearchUrl(`/search/findByCategory?category=${value}&page=<pageNumber>&size=${booksPerPage}`);
        } else {
            setCategorySelection('ALL');
            setSearchUrl(`?page=<pageNumber>&size=${booksPerPage}`)//change the page=0 to page=<pageNumber>
        }
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
                                placeholder='Search' aria-labelledby='Search'
                                onChange={e => setSearch(e.target.value)}/>
                            <button className='btn btn-outline-success'
                                onClick={() => searchHandleChange()}>
                                Search
                            </button>
                        </div>
                    </div>
                    <div className='col-4'>
                        <div className='dropdown'>
                            <button className='btn btn-secondary dropdown-toggle' type='button'
                                id='dropdownMenuButton1' data-bs-toggle='dropdown'
                                aria-expanded='false'>
                                {categorySelection}    
                            </button>
                            <ul className='dropdown-menu' aria-labelledby='dropdownMenuButton1'>
                                <li onClick={() => categoryField('ALL')}>
                                    <a className='dropdown-item' href='#'>
                                        ALL
                                    </a>
                                </li>
                                <li onClick={() => categoryField('FE')}>
                                    <a className='dropdown-item' href='#'>
                                        Front End
                                    </a>
                                </li>
                                <li onClick={() => categoryField('BE')}>
                                    <a className='dropdown-item' href='#'>
                                        Back End
                                    </a>
                                </li>
                                <li onClick={() => categoryField('Data')}>
                                    <a className='dropdown-item' href='#'>
                                        Data
                                    </a>
                                </li>
                                <li onClick={() => categoryField('DevOps')}>
                                    <a className='dropdown-item' href='#'>
                                        DevOps
                                    </a>
                                </li>                                
                            </ul>
                        </div>
                    </div>
                    {totalAmountOfBooks > 0 ? (
                    <>
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
                    </>
                    ):(
                    <div className='m-5'>
                        <h3>
                            Can't find what you are looking for?
                        </h3>
                        <a type='button' className='btn main-color btn-md px-4 me-md-2 fw-bold text-white' 
                            href='#'>Library Services</a>
                    </div>
                    )}
                    {/*Only render <Pagination> if totalPages > 1 */}
                    {totalPages > 1 &&
                        <Pagination currentPage={currentPage} totalPages={totalPages} paginate={paginate}/>
                    }
                
                </div>
            </div>
        </div>
    );
}
{/*
<pageNumber>是自定义的占位符。后面真正发请求前，会把它替换成当前页（currentPage - 1，因为后端分页从 0 开始）。
// 构建最终 URL 时：
const searchWithPage = searchUrl.replace('<pageNumber>', String(currentPage - 1));
const url = baseUrl + searchWithPage;

为啥改成 page=0 会“出错”？
不是真正的报错，而是分页失效：
如果你把 searchUrl 里写死成 page=0，那不管你点第几页，最终拼出来的 URL 里永远是 page=0，
所以每一页都拿到第一页的数据，看起来“每页都一样”。
*/}