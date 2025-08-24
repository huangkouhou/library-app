import "./App.css";
import { Navbar } from "./layouts/NavbarAndFooter/Navbar";
import { Footer } from "./layouts/NavbarAndFooter/Footer";
import { HomePage } from "./layouts/HomePage/HomePage";
import { SearchBooksPage } from "./layouts/SearchBookPage/SearchBooksPage";
import { Redirect, Route, Switch } from "react-router-dom"; //v5，Switch 就是“只渲染第一个匹配 Route”的开关；如果是 v6，用 Routes，别再用 Switch。
import { BookCheckoutPage } from "./layouts/BookCheckoutPage/BookCheckoutPage";

export const App = () => {
  return (
    <div className="d-flex flex-column min-vh-100"> {/*容器最小高度占一整屏。内容不够高时也撑满屏幕*/}
      <Navbar />
      <div className="flex-grow-1"> {/*让中间这块主内容占据剩余空间，等价于把 Footer 推到底部*/}
        <Switch>
          <Route path="/" exact> {/*Switch 常配合 exact，避免 / 抢先匹配更长路径。*/}
            <Redirect to="/home" />
          </Route>
          <Route path="/home">
            <HomePage />
          </Route>
          <Route path="/search">
            <SearchBooksPage />
          </Route>
          <Route path='/checkout/:bookId'>
            <BookCheckoutPage />
          </Route>
        </Switch>
      </div>
      <Footer />
    </div>
  );
};
