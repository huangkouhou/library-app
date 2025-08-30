import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useHistory } from 'react-router-dom'; //React Router v6 的 useNavigate

const LoginPage = () => {
  const { loginWithRedirect, isAuthenticated, isLoading, error } = useAuth0();
  const history = useHistory();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      history.replace('/'); 
    }
  }, [isLoading, isAuthenticated, history]);

  if (isLoading) return <div>Signing you in…</div>;
  if (error) return <div>Oops: {error.message}</div>;

  //不再渲染登录按钮（避免闪一下），而“跳转”这件事放到 useEffect 里用路由 API 去做（副作用放在副作用里）
  if (isAuthenticated) return null;// 已登录，不再显示按钮
  return (
    <div>
      <button onClick={() => loginWithRedirect({ appState: { returnTo: '/' } })}>
        Log In
      </button>
    </div>
  );
};
export default LoginPage;



//React Router v6 的 useNavigate版本
// const LoginPage = () => {
//   const { loginWithRedirect, isAuthenticated, isLoading, error } = useAuth0();
//   const navigate = useNavigate();

//   // 已经登录就别再显示按钮，直接走你想去的页面
//   useEffect(() => {
//     if (!isLoading && isAuthenticated) {
//       navigate('/'); // 或 /dashboard 等
//     }
//   }, [isLoading, isAuthenticated, navigate]);
