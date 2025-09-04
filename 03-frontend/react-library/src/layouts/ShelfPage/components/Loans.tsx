import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import ShelfCurrentLoans from "../../../models/ShelfCurrentLoans";
import { SpinnerLoading } from "../../Utils/SpinnerLoading";

export const Loans = () => {
    const { isAuthenticated, getAccessTokenSilently } = useAuth0();
    const [httpError, setHttpError] = useState(null);

    //Current Loans
    const [shelfCurrentLoans, setShelfCurrentLoans] = useState<ShelfCurrentLoans[]>([]);
    const [isLoadingUserLoans, setIsLoadingUserLoans] = useState(true);

    useEffect(() => {
        const fetchUserCurrentLoans = async () => {
            if (isAuthenticated) {
                const accessToken = await getAccessTokenSilently();
                const url = `http://localhost:8080/api/books/secure/currentloans`;
                const responseOptions = {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        'Content-Type': 'application/json'
                    }
                };
                const shelfCurrentLoansResponse = await fetch(url, responseOptions);
                if (!shelfCurrentLoansResponse.ok){
                    throw new Error('Something went wrong');
                }
                const shelfCurrentLoansResponseJson = await shelfCurrentLoansResponse.json();
                setShelfCurrentLoans(shelfCurrentLoansResponseJson);
            }
            setIsLoadingUserLoans(false);
        }
        fetchUserCurrentLoans().catch((error: any) => { 
            setIsLoadingUserLoans(false);
            setHttpError(error.message);
        });
        window.scrollTo(0, 0);
    }, [isAuthenticated, getAccessTokenSilently]);

    if (isLoadingUserLoans){
        return(
            <SpinnerLoading/>
        );
    }

    if (httpError){
        return(
            <div className="container m-5">
                <p>
                    {httpError}
                </p>
            </div>
        );
    }


    return (
        <>
        </>
    );
}