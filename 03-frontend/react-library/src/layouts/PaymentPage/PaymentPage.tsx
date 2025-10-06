import { useAuth0 } from '@auth0/auth0-react';
import { useEffect, useState } from 'react';
import { SpinnerLoading } from '../Utils/SpinnerLoading';

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


    return(<></>);
}