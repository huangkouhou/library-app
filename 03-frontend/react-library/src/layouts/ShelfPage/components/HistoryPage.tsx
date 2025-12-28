import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import HistoryModel from "../../../models/HistoryModel";
import { Pagination } from "../../Utils/Pagination";
import { SpinnerLoading } from "../../Utils/SpinnerLoading";
import { Link } from "react-router-dom";

export const HistoryPage = () => {
  const { isAuthenticated, user, getAccessTokenSilently } = useAuth0();
  const [isLoadingHistory, setIsLoadingHistory] = useState(true);
  const [httpError, setHttpError] = useState(null);

  //Histories
  const [histories, setHistories] = useState<HistoryModel[]>([]);

  //Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

useEffect(() => {
    const fetchUserHistory = async () => {
      if (isAuthenticated) {
        const accessToken = await getAccessTokenSilently();
        
        // 1️⃣ 修改 URL：指向我们在 BookController 新写的 secure 接口
        // 注意：这里不需要传 userEmail，也不需要 page/size 参数（因为后端目前返回的是全量 List）
        const url = `${process.env.REACT_APP_API}/books/secure/history`;

        const requestOptions = {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        };
        const historyResponse = await fetch(url, requestOptions);
        if (!historyResponse.ok) {
          throw new Error("Something went wrong!");
        }
        const historyResponseJson = await historyResponse.json();

        // 2️⃣ 修改解析逻辑：后端现在直接返回数组，不是 _embedded
        if (Array.isArray(historyResponseJson)) {
            setHistories(historyResponseJson);
        } else if (historyResponseJson._embedded) {
            // 保留这行是为了兼容旧逻辑（万一后端没生效）
            setHistories(historyResponseJson._embedded.histories);
        }
        
        // 3️⃣ 暂时禁用分页计算
        // 因为我们后端为了修复 Bug 暂时改成了返回 List，没有 page 信息了。
        // 这里设为 0 或 1，防止底部分页组件报错或显示错误的页数。
        setTotalPages(1);
      }
      setIsLoadingHistory(false);
    };
    fetchUserHistory().catch((error: any) => {
      setIsLoadingHistory(false);
      setHttpError(error.message);
    });
  }, [isAuthenticated, getAccessTokenSilently, user, currentPage]);

  if (isLoadingHistory) {
    return <SpinnerLoading />;
  }

  if (httpError) {
    return (
      <div className="container m-5">
        <p>{httpError}</p>
      </div>
    );
  }

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="mt-2">
      {histories.length > 0 ? (
        <>
          <h5>React History:</h5>

          {histories.map((history) => (
            <div key={history.id}>
              <div className="card mt-3 shadow p-3 mb-3 bg-body rounded">
                <div className="row g-0">
                  <div className="col-md-2">
                    <div className="d-none d-lg-block">
                      {history.img ? (
                        <img
                          src={history.img}
                          width="123"
                          height="196"
                          alt="Book"
                        />
                      ) : (
                        <img
                          src={require("./../../../Images/BooksImages/book-luv2code-1000.png")}
                          width="123"
                          height="196"
                          alt="Default"
                        />
                      )}
                    </div>
                    <div className="d-lg-none d-flex justify-content-center align-items-center">
                      {history.img ? (
                        <img
                          src={history.img}
                          width="123"
                          height="196"
                          alt="Book"
                        />
                      ) : (
                        <img
                          src={require("./../../../Images/BooksImages/book-luv2code-1000.png")}
                          width="123"
                          height="196"
                          alt="Default"
                        />
                      )}
                    </div>
                  </div>
                    <div className="col-md-10">
                      <div className="card-body">
                        <h5 className="card-title">{history.author}</h5>
                        <h4>{history.title}</h4>
                        <p className="card-text">{history.description}</p>
                        <hr />
                        <p className="card-text">
                          {" "}
                          Checked out on: {history.checkoutDate}
                        </p>
                        <p className="card-text">
                          {" "}
                          Returned on: {history.returnedDate}
                        </p>
                      </div>
                    </div>
                </div>
              </div>
            </div>
          ))}
        </>
      ) : (
        <>
          <h3 className="mt-3"> Currently no history: </h3>
          <Link className="btn btn-primary" to={"search"}>
            Search for new book
          </Link>
        </>
      )}
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
