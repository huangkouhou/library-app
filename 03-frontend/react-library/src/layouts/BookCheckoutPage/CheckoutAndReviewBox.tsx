import { Link } from "react-router-dom";
import BookModel from "../../models/BookModel";

export const CheckoutAndReviewBox: React.FC<{
  book: BookModel | undefined;
  mobile: boolean,
  currentLoansCount: number,
  isAuthenticated: any, //any 是 TypeScript 里的“放弃类型检查”类型
  isCheckedOut: boolean,
  checkoutBook: any
}> = (props) => {

  //Dynamic Button Rendering
  function buttonRender() {

    // 未登录：直接去登录
    if (!props.isAuthenticated){
      return (<Link to={'/login'} className="btn btn-success btn-lg">Sign in</Link>)
    }
    // 已借出：提示
  if (props.isCheckedOut) {
    return <p><b>Book checked out. Enjoy!</b></p>;
  }

  // 无可借副本或已达上限：提示
  const noCopies = !(props.book?.copiesAvailable && props.book.copiesAvailable > 0);
  if (props.currentLoansCount >= 5 || noCopies) {
    return <p className="text-danger">Too many books checked out.</p>;
  }

  // 可以借：显示按钮（确保真的调用 checkoutBook）
  return (
    <button
      type="button"
      onClick={props.checkoutBook}
      className="btn btn-success btn-lg"
    >
      Checkout
    </button>
  );
  }


  return (
    <div
      className={
        props.mobile ? "card d-flex mt-5" : "card col-3 container d-flex mb-5"
      }
    >
      <div className="mt-3">
        <p>
          <b>{props.currentLoansCount}/5 </b> {/*don't forget the pass the currentLoansCount in the parent*/}
          books checked out
        </p>
        <hr />
        {props.book &&
        props.book.copiesAvailable &&
        props.book.copiesAvailable > 0 ? (
          <h4 className="text-success">Available</h4>
        ) : (
          <h4 className="text-danger">Wait List</h4>
        )}
        <div className="row">
            <p className="col-6 lead">
                <b>{props.book?.copies} </b>
                copies
            </p>
            <p className="col-6 lead">
                <b>{props.book?.copiesAvailable} </b>
                available
            </p>
        </div>
        {buttonRender()}
        <hr />
        <p className="mt-3">
            This number can change until placing order has been complete.
        </p>
        <p>
            Sign in to be able to leave a review.
        </p>
      </div>
    </div>
  );
};
