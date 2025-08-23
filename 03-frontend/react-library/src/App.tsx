import "./App.css";
import { Navbar } from "./layouts/NavbarAndFooter/Navbar";
import { Footer } from "./layouts/NavbarAndFooter/Footer";
import { HomePage } from "./layouts/HomePage/HomePage";
import { SearchBooksPage } from "./layouts/SearchBookPage/SearchBooksPage";
import { Redirect, Route, Switch } from "react-router-dom"; //v5，Switch 就是“只渲染第一个匹配 Route”的开关；如果是 v6，用 Routes，别再用 Switch。

export const App = () => {
  return (
    <div>
      <Navbar />
      <Switch>
        <Route path="/" exact> {/*Switch 常配合 exact，避免 / 抢先匹配更长路径。*/}
          <Redirect to='/home' />
        </Route>
        <Route path='/home'>
          <HomePage />
        </Route>
        <Route path="/search">
          <SearchBooksPage />
        </Route>
      </Switch>
      <Footer />
    </div>
  );
};
