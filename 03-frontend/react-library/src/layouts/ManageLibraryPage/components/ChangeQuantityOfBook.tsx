import { useEffect, useState } from "react";
import BookModel from "../../../models/BookModel";
import { useAuth0 } from "@auth0/auth0-react";

export const ChangeQuantityOfBook: React.FC<{book: BookModel, deleteBook: any}> = (props) => {

    const { getAccessTokenSilently } = useAuth0();
    const [quantity, setQuantity] = useState<number>(0);
    const [remaining, setRemaining] = useState<number>(0);

    useEffect(() => {
        setQuantity(props.book.copies ?? 0);//把 props.book.copies 的值存到 quantity 这个 state 里。如果 props.book.copies 是 null 或 undefined，就用 0。
        setRemaining(props.book.copiesAvailable ?? 0);
    }, [props.book]);

    async function increaseQuantity(){
        const url = `${process.env.REACT_APP_API}/admin/secure/increase/book/quantity?bookId=${props.book?.id}`;
        const accessToken = await getAccessTokenSilently();
        const requestOptions: RequestInit = {
            method: 'PUT', 
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            }
        };

        const quantityUpdateResponse = await fetch(url, requestOptions);
        if (!quantityUpdateResponse.ok){
            throw new Error('Something went wrong!');
        }
        setQuantity(quantity + 1);
        setRemaining(remaining + 1);

    }

    async function decreaseQuantity(){
        const url = `${process.env.REACT_APP_API}/admin/secure/decrease/book/quantity?bookId=${props.book?.id}`;
        const accessToken = await getAccessTokenSilently();
        const requestOptions: RequestInit = {
            method: 'PUT', 
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            }
        };

        const quantityUpdateResponse = await fetch(url, requestOptions);
        if (!quantityUpdateResponse.ok){
            throw new Error('Something went wrong!');
        }
        setQuantity(quantity - 1);
        setRemaining(remaining - 1);

    }

    async function deleteBook(){
        const url = `${process.env.REACT_APP_API}/admin/secure/delete/book?bookId=${props.book?.id}`;
        const accessToken = await getAccessTokenSilently();
        const requestOptions: RequestInit = {
            method: 'DELETE', 
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            }
        };

        const updateResponse = await fetch(url, requestOptions);
        if (!updateResponse.ok){
            throw new Error('Something went wrong!');
        }
        props.deleteBook();//切换布尔状态 bookDelete 的值,从False切换到True
    }


    return (
    <div className="card mt-3 shadow p-3 mb-3 bg-body rounded">
        <div className="row g-0">
            <div className="col-md-2">
                <div className="d-none d-lg-block">
                    {props.book.img ?
                        <img src={props.book.img} width='123' height='196' alt='Book' />
                        :
                        <img src={require('./../../../Images/BooksImages/book-luv2code-1000.png')}
                            width='123' height='196' alt='Book'/>
                    }
                </div>
                <div className="d-lg-none d-flex justify-content-center align-items-center">
                    {props.book.img ?
                        <img src={props.book.img} width='123' height='196' alt='Book' />
                        :
                        <img src={require('./../../../Images/BooksImages/book-luv2code-1000.png')}
                            width='123' height='196' alt='Book'/>
                    }
                </div>
            </div>
            <div className="col-md-6">
                <div className="card-body">
                    <h5 className="card-title">{props.book.author}</h5>
                    <h4>{props.book.title}</h4>
                    <p className="card-text">{props.book.description}</p>
                </div>
            </div>
            <div className="mt-3 col-md-4">
                <div className="d-flex justify-content-center align-items-center">
                    <p>Total QUantity: <b>{quantity}</b></p>
                </div>
                <div className="d-flex justify-content-center align-items-center">
                    <p>Book Remaining: <b>{remaining}</b></p>
                </div>
            </div>
            <div className="mt-3 col-md-1">
                <div className="d-flex justify-content-start">
                    <button className="m-1 btn btn-md btn-danger" onClick={deleteBook}>Delete</button>
                </div>
            </div>
            <button className="m-1 btn btn-md main-color text-white" onClick={increaseQuantity}>Add Quantity</button>
            <button className="m-1 btn btn-md btn-warning" onClick={decreaseQuantity}>Decrease Quantity</button>
        </div>
    </div>
    );
}


// 局部状态（只影响自己） → 子组件内部维护就够了（increaseQuantity / decreaseQuantity）。
// 全局状态（影响父组件或整个列表） → 必须让父组件维护，再把操作函数传给子组件（deleteBook）。

// deleteBook 需要告诉父组件“把我从列表里移除”。
// increaseQuantity 和 decreaseQuantity 只改自己显示的数字，不涉及父组件的全局数据。

