import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";

export const Heros = () => {
  
  const { isAuthenticated } = useAuth0();

  return (
    <div>
      <div className="d-none d-lg-block">
        <div className="row g-0 mt-5">
          <div className="col-sm-6 col-md-6">
            <div className="col-image-left"></div>
          </div>

          <div className="col-4 col-md container d-flex justify-content-center align-items-center">
            <div className="ml-2">
              <h1>What have you been reading?</h1>
              <p className="lead">
                The library team would love to know what you have been reading.
                Whether it is to learn a new skill or grow within one, we will
                be able to provide the top content for you!
              </p>
              {isAuthenticated ? (
                <Link
                  type="button"
                  className="btn main-color btn-lg text-white"
                  to="search"
                >
                  Explore top books
                </Link>
              ) : (
                <Link className="btn main-color btn-lg text-white" to="/login">
                  Sign up
                </Link>
              )}
            </div>
          </div>
        </div>

        <div className="row g-0">
          <div
            className="col-4 col-md-4 container d-flex
                    justify-content-center align-items-center"
          >
            <div className="ml-2">
              <h1>Our collection is always changing!</h1>
              <p className="ml-2">
                Try to check in daily as our collection is always changing! We
                work nonstop to provide the most accurate book selection
                possible for our Luv 2 Read students! We are diligent about our
                book selection and our books are always going to be our top
                priority.
              </p>
            </div>
          </div>
          <div className="col-sm-6 col-md-6">
            <div className="col-image-right"></div>
          </div>
        </div>
      </div>

      {/*Mobile Heros*/}
      <div className="d-lg-none">
        <div className="container">
          <div className="m-2">
            <div className="col-image-left"></div>
            <div className="mt-2">
              <h1>What have you been reading?</h1>
              <p className="lead">
                The library team would love to know what you have been reading.
                Whether it is to learn a new skill or grow within one, we will
                be able to provide the top content for you!
              </p>
              {isAuthenticated ? (
                <Link
                  type="button"
                  className="btn main-color btn-lg text-white"
                  to="search"
                >
                  Explore top books
                </Link>
              ) : (
                <Link className="btn main-color btn-lg text-white" to="/login">
                  Sign up
                </Link>
              )}
            </div>
          </div>
          <div className="m-2">
            <div className="col-image-right"></div>
            <div className="mt-2">
              <h1>What have you been reading?</h1>
              <p className="lead">
                The library team would love to know what you have been reading.
                Whether it is to learn a new skill or grow within one, we will
                be able to provide the top content for you!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// | 类名                                   | 来源        | 含义 / 效果                                     |
// | ------------------------------------ | --------- | ------------------------------------------- |
// | **d-none**                           | Bootstrap | 隐藏元素（display\:none）                         |
// | **d-lg-block**                       | Bootstrap | 在大屏 (≥992px) 显示为 block                      |
// | **d-lg-none**                        | Bootstrap | 在大屏 (≥992px) 隐藏，在小屏显示                       |
// | **row**                              | Bootstrap | 栅格系统的一行                                     |
// | **col-sm-6**                         | Bootstrap | 小屏 (≥576px) 占 6/12 宽度                       |
// | **col-md-6**                         | Bootstrap | 中屏 (≥768px) 占 6/12 宽度                       |
// | **col-4**                            | Bootstrap | 超小屏占 4/12 宽度                                |
// | **col-md**                           | Bootstrap | 自动调整宽度的列                                    |
// | **g-0**                              | Bootstrap | grid gap = 0（去掉列间距）                         |
// | **mt-5**                             | Bootstrap | margin-top: 3rem (≈80px)                    |
// | **ml-2**                             | Bootstrap | margin-left: 0.5rem                         |
// | **m-2**                              | Bootstrap | margin: 0.5rem (四周)                         |
// | **container**                        | Bootstrap | 居中容器，宽度随屏幕大小调整                              |
// | **d-flex**                           | Bootstrap | display\:flex                               |
// | **justify-content-center**           | Bootstrap | Flex 容器 → 水平居中                              |
// | **align-items-center**               | Bootstrap | Flex 容器 → 垂直居中                              |
// | **lead**                             | Bootstrap | 大号/浅色正文段落样式                                 |
// | **btn**                              | Bootstrap | 按钮基础样式                                      |
// | **btn-lg**                           | Bootstrap | 大号按钮                                        |
// | **text-white**                       | Bootstrap | 字体颜色 = 白色                                   |
// | **main-color**                       | 自定义       | 你自己定义的按钮背景色（比如主题色）                          |
// | **col-image-left / col-image-right** | 自定义       | 你定义的背景图容器（常见写法：`background-image + height`） |
