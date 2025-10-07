import { useAuth0 } from '@auth0/auth0-react';
import { useEffect, useState } from 'react';
import { SpinnerLoading } from '../Utils/SpinnerLoading';
import { CardElement } from '@stripe/react-stripe-js';
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