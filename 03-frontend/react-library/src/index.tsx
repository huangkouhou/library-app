import ReactDOM from 'react-dom/client';
import './index.css';
import { App } from './App';
import { BrowserRouter } from 'react-router-dom';//顶层路由容器,一般全站只放 1 个，包住应用。没有它，Routes/Route、Link/NavLink、useNavigate 等都不能用。
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const stripePromise = loadStripe('pk_test_51SCt4tJRFIfxq8mJnJCaIAXcURs8yKDctvfHBuHSuvc8dFr0o7n8sKBxJGDM0cCtAtKZDTtZ4BLejy3HwOfuUVtx007472XvHT');

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <BrowserRouter>
  <Elements  stripe={stripePromise}>
    <App />
  </Elements>
  </BrowserRouter>
);


