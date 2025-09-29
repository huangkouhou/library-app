import { useEffect, useState } from "react";
import ReviewModel from "../../../models/ReviewModel";
import { SpinnerLoading } from "../../Utils/SpinnerLoading";
import { Review } from "../../Utils/Review";
import { Pagination } from "../../Utils/Pagination";

export const ReviewListPage = () => {
  const [reviews, setReviews] = useState<ReviewModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState<string | null>(null);


  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [reviewsPerPage] = useState(5);
  const [totalAmountOfReviews, setTotalAmountOfReviews] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const bookId = window.location.pathname.split("/")[2];

  //Review useEffect
  useEffect(() => {
    const fetchBookReviews = async () => {
      setIsLoading(true);
      
      const reviewUrl =
        `${process.env.REACT_APP_API}/reviews/search/findByBookId?bookId=${bookId}` +
        `&page=${currentPage - 1}&size=${reviewsPerPage}`;

      const responseReviews = await fetch(reviewUrl);

      if (!responseReviews.ok) {
        throw new Error("Something went wrong!");
      }

      const responseJsonReviews = await responseReviews.json();
      //responseJsonReviews: 这是一个 JavaScript 对象，React 应用通过 fetch 或 axios 从后端 API 获取到的、已经解析好的 JSON 响应数据。
      //从后端返回的完整 JSON 响应 (responseJsonReviews) 中，进入‘附件’部分 (_embedded)，然后取出名为 reviews 的那个文件（也就是评论的数组）
      const responseData = responseJsonReviews._embedded.reviews;

      //.page.totalElements 和 .page.totalPages: 访问这个 JSON 对象中的 page 属性，并从中读取 totalElements 和 totalPages 这两个字段的值。
      setTotalAmountOfReviews(responseJsonReviews.page.totalElements);
      setTotalPages(responseJsonReviews.page.totalPages);

      const loadedReviews: ReviewModel[] = [];

      for (const key in responseData) {
        loadedReviews.push({
          id: responseData[key].id,
          userEmail: responseData[key].userEmail,
          date: responseData[key].date,
          rating: responseData[key].rating,
          book_id: responseData[key].bookId,
          reviewDescription: responseData[key].reviewDescription,
        });
      }

      setReviews(loadedReviews);
      setIsLoading(false);
    };

    fetchBookReviews().catch((error: any) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, [currentPage, bookId, reviewsPerPage]);

  if (isLoading) {
    return <SpinnerLoading />;
  }

  if (httpError) {
    return (
      <div className="container m-5">
        <p>{httpError}</p>
      </div>
    );
  }

  const indexOfLastReview: number = currentPage * reviewsPerPage; //计算当前页的“最后一条”评论的索引
  const indexOfFirstReview: number = indexOfLastReview - reviewsPerPage; //计算当前页的“第一条”评论的索引。 有了结束索引，再减去每页的数量，就能得到起始索引。

  let lastItem =
    reviewsPerPage * currentPage <= totalAmountOfReviews
      ? reviewsPerPage * currentPage
      : totalAmountOfReviews;

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="container m-5">
      <div>
        <h3>Comments: ({reviews.length})</h3>
      </div>
      <p>
        {indexOfFirstReview + 1} to {lastItem} of {totalAmountOfReviews} items:
      </p>
      <div className="row">
        {reviews.map((review) => (
          <Review review={review} key={review.id} />
        ))}
      </div>

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          paginate={paginate}
        />
      )}
    </div>
  );
};
