import { useAuth0 } from '@auth0/auth0-react';
import { useEffect, useState } from 'react';
import { SpinnerLoading } from '../Utils/SpinnerLoading';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { Link } from 'react-router-dom';

export const PaymentPage = () => {

    const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();//从 Auth0 导入 user 对象
    const [httpError, setHttpError] = useState(false);
    const [submitDisabled, setSubmitDisabled] = useState(false);
    const [fees, setFees] = useState(0);
    const [loadingFees, setLoadingFees] = useState(true);

    useEffect(() => {
    const fetchFees = async () => {
        try {
        if (isAuthenticated) {
            const accessToken = await getAccessTokenSilently();
            const url = `${process.env.REACT_APP_API}/payments/search/findByUserEmail?userEmail=${user?.email}`;

            const requestOptions = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`,
            },
            };

            const paymentResponse = await fetch(url, requestOptions);
            if (!paymentResponse.ok) {
            throw new Error("Something went wrong!");
            }

            const paymentResponseJson = await paymentResponse.json();
            setFees(paymentResponseJson.amount);
        }
        } catch (error: any) {
        setHttpError(error.message);
        } finally {
        setLoadingFees(false);
        }
    };

    fetchFees();
    }, [isAuthenticated, getAccessTokenSilently]);

    const elements = useElements();
    const stripe = useStripe();

    async function checkout() {
        if (!stripe || !elements || !elements.getElement(CardElement)) {
            return;
        }

        setSubmitDisabled(true);

        try {
            const accessToken = await getAccessTokenSilently();

            // ✅ 直接使用普通对象构造请求体，而不是 new PaymentInfoRequest
            const paymentInfo = {
                amount: Math.round(fees * 100),
                currency: 'USD',
                userEmail: user?.email,  // 从 Auth0 的 user 对象中读取
            };

            const url = `https://localhost:8443/api/payment/secure/payment-intent`;
            const requestOptions = {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${accessToken}`,
                },
                body: JSON.stringify(paymentInfo),
            };

            const stripeResponse = await fetch(url, requestOptions);
            if (!stripeResponse.ok) {
                throw new Error('Something went wrong while creating payment intent!');
            }

            const stripeResponseJson = await stripeResponse.json();

            const result = await stripe.confirmCardPayment(stripeResponseJson.client_secret, {
                payment_method: {
                    card: elements.getElement(CardElement)!,
                    billing_details: {
                        email: user?.email || undefined,  // 如果没有 email 就传 undefined
                    },
                },
            }, { handleActions: false });

            if (result.error) {
                alert('There was an error with your payment.');
                setSubmitDisabled(false);
                return;
            }

            // ✅ 如果支付成功，通知后端更新状态
            const completeUrl = `https://localhost:8443/api/payment/secure/payment-complete`;
            const completeOptions = {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${accessToken}`,
                },
            };

            const completeResponse = await fetch(completeUrl, completeOptions);
            if (!completeResponse.ok) {
                throw new Error('Something went wrong while completing the payment!');
            }

            setFees(0);
            setHttpError(false);
            setSubmitDisabled(false);
            alert('Payment completed successfully!');

        } catch (error: any) {
            setHttpError(true);
            setSubmitDisabled(false);
            console.error(error);
        }
    }



    if (loadingFees){
        return(
            <SpinnerLoading/>
        );
    }

    if (httpError){
        return(
            <div className='container m-5'>
                <p>{httpError}</p>
            </div>
        );
    }


    return(
        <div className='container'>
            {fees > 0 && <div className='card mt-3'>
                <h5 className='card-header'>Fee pending: <span className='text-danger'>${fees}</span></h5>
                <div className='card-body'>
                    <h5 className='card-title mb-3'>Credit Card</h5>
                    <CardElement id='card-element'/>
                    <button disabled={submitDisabled} type='button' className='btn btn-md main-color text-white mt-3'>
                        Pay fees
                    </button>
                </div>
            </div>}
            
            {fees === 0 && 
                <div className='mt-3'>
                    <h5>You have no fees!</h5>
                    <Link type='button' className='btn main-color text-white' to='search'>
                        Explore top books
                    </Link>
                </div>
            }

            {submitDisabled && <SpinnerLoading/>}

        </div>
    );
}