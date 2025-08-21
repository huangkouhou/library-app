import React from 'react';
import BookModel from '../../../models/BookModel';

//React.FC 是 TypeScript 里给“函数组件”的类型别名（全名 React.FunctionComponent）
//这个对象必须有一个名为 book 的属性，该属性的类型是 BookModel（自定义的类/接口）。
export const ReturnBook: React.FC<{book: BookModel}> = (props) => {
    return (
        <div className="col-xs-6 col-sm-6 col-md-4 col-lg-3 mb-3">
            <div className="text-center">
                {props.book.img? 
                    <img 
                        src={props.book.img}
                        width='151'
                        height='233'
                        alt='book'
                    />
                    :
                    <img 
                        src={require('./../../../Images/BooksImages/book-luv2code-1000.png')}
                        width='151'
                        height='233'
                        alt='book'
                    />
                }

                <h6 className="mt-2">{props.book.title}</h6>
                <p>{props.book.author}</p>
                <a className="btn main-color text-white" href='#'>Reserve</a>
            </div>
        </div>
    );
}