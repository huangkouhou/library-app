import { useEffect, useState } from "react";
import BookModel from "../../models/BookModel";
import { SpinnerLoading } from "../Utils/SpinnerLoading";
import { StarsReview } from "../Utils/StarsReview";
import { CheckoutAndReviewBox } from "./CheckoutAndReviewBox";
import ReviewModel from "../../models/ReviewModel";
import { LatestReviews } from "./LatestReviews";
import { useAuth0 } from "@auth0/auth0-react";
import ReviewRequestModel from "../../models/ReviewRequestModel";

export const BookCheckoutPage = () => {
  //add Auth0 authentication
  const { isAuthenticated, getAccessTokenSilently } = useAuth0(); //从 useAuth0() 返回的对象里，只取出两个属性

  // ① 在组件顶层定义状态
  const [book, setBook] = useState<BookModel>();
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);

  //Review State
  const [reviews, setReviews] = useState<ReviewModel[]>([]);
  const [totalStars, setTotalStars] = useState(0);
  const [isLoadingReview, setIsLoadingReview] = useState(true);
  //already left a review?
  const [isReviewLeft, setIsReviewLeft] = useState(false);
  const [isLoadingUserReview, setIsLoadingUserReview] = useState(true);

  //Loans Count State
  const [currentLoansCount, setCurrentLoansCount] = useState(0);
  const [isLoadingCurrentLoansCount, setIsLoadingCurrentLoansCount] =
    useState(true);

  //Is Book Check Out?
  const [isCheckedOut, setIsCheckedOut] = useState(false);
  const [isLoadingBookCheckedOut, setIsLoadingBookCheckedOut] = useState(true);

  const bookId = window.location.pathname.split("/")[2]; //for example localhost:3000/checkout/<bookId>

  // ② 在 useEffect 里，根据“依赖数组”去更新状态
  useEffect(() => {
    //useEffect(() => { ... }, ...) 的回调函数，写副作用逻辑（取数、订阅、定时器等）。
    const fetchBook = async () => {
      const baseUrl: string = `http://localhost:8080/api/books/${bookId}`;

      const response = await fetch(baseUrl);

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const responseJson = await response.json();

      const loadedBook: BookModel = {
        id: responseJson.id,
        title: responseJson.title,
        author: responseJson.author,
        description: responseJson.description,
        copies: responseJson.copies,
        copiesAvailable: responseJson.copiesAvailable,
        category: responseJson.category,
        img: responseJson.img,
      };

      setBook(loadedBook);
      setIsLoading(false);
    };
    fetchBook().catch((error: any) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, [isCheckedOut, getAccessTokenSilently, bookId]); //[...] 依赖数组，决定何时运行：只在首次挂载运行一次；[a, b]：当 a 或 b 变化时运行。省略 []：每次渲染后都运行（少用）。

  //Review useEffect
  useEffect(() => {
    const fetchBookReviews = async () => {
      const reviewUrl: string = `http://localhost:8080/api/reviews/search/findByBookId?bookId=${bookId}`;

      const responseReviews = await fetch(reviewUrl);

      if (!responseReviews.ok) {
        throw new Error("Something went wrong!");
      }

      const responseJsonReviews = await responseReviews.json();

      const responseData = responseJsonReviews._embedded.reviews;

      const loadedReviews: ReviewModel[] = [];

      let weightedStarReviews: number = 0;

      for (const key in responseData) {
        loadedReviews.push({
          id: responseData[key].id,
          userEmail: responseData[key].userEmail,
          date: responseData[key].date,
          rating: responseData[key].rating,
          book_id: responseData[key].bookId,
          reviewDescription: responseData[key].reviewDescription,
        });
        weightedStarReviews = weightedStarReviews + responseData[key].rating; //把所有评论的评分相加review的“总分”
      }

      //把“所有评分的平均值”四舍五入到最接近的 0.5，并存进状态 totalStars
      //* 2 再 Math.round(...) 再 / 2：把平均分按 0.5 为步长取整。
      //.toFixed(1)：把数字格式化成 1 位小数的字符串（比如 "4.5"）。
      if (loadedReviews) {
        const round = (
          Math.round((weightedStarReviews / loadedReviews.length) * 2) / 2
        ).toFixed(1);
        setTotalStars(Number(round));
      }

      setReviews(loadedReviews);
      setIsLoadingReview(false);
    };

    fetchBookReviews().catch((error: any) => {
      setIsLoadingReview(false);
      setHttpError(error.message);
    });
  }, [bookId, isReviewLeft]);

  //already left a review?
  useEffect(() => {
    const fetchUserReviewBook = async () => {
        if (isAuthenticated){
          const accessToken = await getAccessTokenSilently();
          const url = `http://localhost:8080/api/reviews/secure/user/book?bookId=${bookId}`;
          const requestOptions = {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${accessToken}`,
              'Content-Type':'application/json'
            }
          };
          const userReview = await fetch(url, requestOptions);
          if (!userReview.ok){
            throw new Error('Something went wrong');
          }
          const userReviewResponseJson = await userReview.json();
          setIsReviewLeft(userReviewResponseJson);
        }
        setIsLoadingUserReview(false);
    }
    fetchUserReviewBook().catch((error: any) => {
        setIsLoadingUserReview(false);
        setHttpError(error.message);
    })
  }, [isAuthenticated, getAccessTokenSilently, bookId]);



  //currentLoansCount useEffect(因为是自定义的api所以需要const requestOptions)
  useEffect(() => {
    const fetchUserCurrentLoansCount = async () => {
      if (isAuthenticated) {
        const accessToken = await getAccessTokenSilently();
        const url = `http://localhost:8080/api/books/secure/currentloans/count`;
        //requestOptions 就是你传给 fetch(url, options) 的第二个参数，用来告诉浏览器这次请求要怎么发
        const requestOptions = {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`, // ← Bearer 后面有一个空格
            "Content-Type": "application/json",
          },
        };
        const currentLoansCountResponse = await fetch(url, requestOptions);
        if (!currentLoansCountResponse.ok) {
          throw new Error("Something went wrong!");
        }
        const currentLoansCountResponseJson =
          await currentLoansCountResponse.json();
        setCurrentLoansCount(currentLoansCountResponseJson);
      }
      setIsLoadingCurrentLoansCount(false);
    };
    fetchUserCurrentLoansCount().catch((error: any) => {
      setIsLoadingCurrentLoansCount(false);
      setHttpError(error.message);
    });
  }, [isAuthenticated,getAccessTokenSilently, isCheckedOut]);

  //Is Book CheckedOut useEffect
  useEffect(() => {
    const fetchUserCheckedOutBook = async () => {
      if (isAuthenticated) {
        const accessToken = await getAccessTokenSilently();
        const url = `http://localhost:8080/api/books/secure/ischeckedout/byuser?bookId=${bookId}`;
        const requestOptions = {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        };
        const bookCheckedOut = await fetch(url, requestOptions);

        if (!bookCheckedOut.ok) {
          throw new Error("Something went wrong!");
        }

        const bookCheckedOutResponseJson = await bookCheckedOut.json();
        setIsCheckedOut(bookCheckedOutResponseJson);
      }
      setIsLoadingBookCheckedOut(false);
    };
    fetchUserCheckedOutBook().catch((error: any) => {
      setIsLoadingBookCheckedOut(false);
      setHttpError(error.message);
    });
  }, [isAuthenticated, getAccessTokenSilently, bookId]);

  if (
    isLoading ||
    isLoadingReview ||
    isLoadingCurrentLoansCount ||
    isLoadingBookCheckedOut ||
    isLoadingUserReview
  ) {
    return <SpinnerLoading />;
  }

  if (httpError) {
    return (
      <div className="container m-5">
        <p>{httpError}</p>
      </div>
    );
  }

  //checkoutBook function
  async function checkoutBook(){
    const accessToken = await getAccessTokenSilently();
    const url = `http://localhost:8080/api/books/secure/checkout?bookId=${book?.id}`;
    const requestOptions = {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    };
    const checkoutResponse = await fetch(url, requestOptions);
    if (!checkoutResponse.ok) {
      throw new Error('Something went wrong!');
    }
    setIsCheckedOut(true);
  };


   //submit review function
  async function submitReview(starInput: number, reviewDescription: string){
    let bookId: number = 0;
    if (book?.id){
      bookId = book.id;
    }
    const reviewRequestModel = new ReviewRequestModel(starInput, bookId, reviewDescription);
    const url = `http://localhost:8080/api/reviews/secure`;
    const accessToken = await getAccessTokenSilently();
    const requestOptions = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(reviewRequestModel)
    };
    const returnResponse = await fetch(url, requestOptions);
    if (!returnResponse.ok) {
      throw new Error('Something went wrong!');
    }
    setIsReviewLeft(true);
  }

  return (
    <div>
      <div className="container d-none d-lg-block">
        {/*小于 lg(992px) 隐藏（d-none），lg 及以上显示为块级（d-lg-block）。用途：只在「桌面端」显示的部分。*/}
        <div className="row mt-5">
          <div className="col-sm-2 col-md-2">
            {book?.img ? (
              <img src={book?.img} width="226" height="349" alt="Book" />
            ) : (
              <img
                src={require("./../../Images/BooksImages/book-luv2code-1000.png")}
                width="226"
                height="349"
                alt="Book"
              />
            )}
          </div>
          <div className="col-4 col-md-4 container">
            <div className="ml-2">
              <h2>{book?.title}</h2>
              <h5 className="text-primary">{book?.author}</h5>
              <p className="lead">{book?.description}</p>
              <StarsReview rating={totalStars} size={32} />
            </div>
          </div>
          <CheckoutAndReviewBox
            book={book}
            mobile={false}
            currentLoansCount={currentLoansCount}
            isAuthenticated={isAuthenticated}
            isCheckedOut={isCheckedOut}
            checkoutBook={checkoutBook}
            isReviewLeft={isReviewLeft}
            submitReview={submitReview}
          />
        </div>
        <LatestReviews reviews={reviews} bookId={book?.id} mobile={false} />
        <hr />
      </div>
      <div className="container d-lg-none mt-5">
        {/*lg 及以上隐藏，小于 lg 显示（保持默认 display）。用途：只在「手机/平板」显示的部分。*/}
        <div className="d-flex justify-content-center align-items-center">
          {book?.img ? (
            <img src={book?.img} width="226" height="349" alt="Book" />
          ) : (
            <img
              src={require("./../../Images/BooksImages/book-luv2code-1000.png")}
              width="226"
              height="349"
              alt="Book"
            />
          )}
        </div>
        <div className="mt-4">
          <div className="ml-2">
            <h2>{book?.title}</h2>
            <h5 className="text-primary">{book?.author}</h5>
            <p className="lead">{book?.description}</p>
            <StarsReview rating={totalStars} size={32} />
          </div>
        </div>
          <CheckoutAndReviewBox
            book={book}
            mobile={false}
            currentLoansCount={currentLoansCount}
            isAuthenticated={isAuthenticated}
            isCheckedOut={isCheckedOut}
            checkoutBook={checkoutBook}
            isReviewLeft={isReviewLeft}
            submitReview={submitReview}
          />
        <hr />
        <LatestReviews reviews={reviews} bookId={book?.id} mobile={true} />
      </div>
    </div>
  );
};

// 数据库 ←(JPA/SQL)— Service/Repository ←(调用)— Controller
//    ↘——————————————(序列化为 JSON)——————————————↗
//                  HTTP 响应 (200, body)
//                                 ↘
//  fetch(...) → Response → .json() → currentLoansCountResponseJson → setState
