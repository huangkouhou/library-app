import { useAuth0 } from '@auth0/auth0-react';
import { useEffect, useState } from 'react';

export const ManageLibraryPage = () => {

    const { getIdTokenClaims } = useAuth0();//ID Token 是给前端用来识别用户的。
    const [roles, setRoles] = useState<string[] | null>(null);// set roles to null initially
    const [loading, setLoading] = useState(true); // Loading state to handle async data

    const [changeQuantityOfBooksClick, setChangeQuantityOfBooksClick] = useState(false);
    const [messagesClick, setMessagesClick] = useState(false);


    useEffect(() => {
        const fetchRoles = async () => {

        };
    })

    function addBookClickFunction(){
        setChangeQuantityOfBooksClick(false);
        setMessagesClick(false);
    }

    function changeQuantityOfBooksClickFunction(){
        setChangeQuantityOfBooksClick(true);
        setMessagesClick(false);
    }

    function messagesClickFunction(){
        setChangeQuantityOfBooksClick(false);
        setMessagesClick(true);
    }
    

    return (
        <div className='container'>
            <div className='mt-5'>
                <h3>Manage Library</h3>
                <nav>
                    <div className='nav nav-tabs' id='nav-tab' role='tablist'>
                        <button onClick={addBookClickFunction} className='nav-link active' id='nav-add-book-tab' data-bs-toggle='tab'
                            data-bs-target='#nav-add-book' type='button' role='tab' aria-controls='nav-add-book'
                            aria-selected='false'
                        >
                            Add new book
                        </button>
                        <button onClick={changeQuantityOfBooksClickFunction} className='nav-link' id='nav-quantity-tab' data-bs-toggle='tab'
                            data-bs-target='#nav-quantity' type='button' role='tab' aria-controls='nav-add-book'
                            aria-selected='true'
                        >
                            Change quantity
                        </button>
                        <button onClick={messagesClickFunction} className='nav-link' id='nav-messages-tab' data-bs-toggle='tab'
                            data-bs-target='#nav-messages' type='button' role='tab' aria-controls='nav-messages'
                            aria-selected='false'
                        >
                            Messages
                        </button>
                    </div>
                </nav>
                <div className='tab-content' id='nav-tabContent'>
                    <div className='tab-pane fade show active' id='nav-add-book' role='tabpanel'
                        aria-labelledby='nav-add-book-tab'>
                        Add new book
                    </div>
                    <div className='tab-pane fade' id='nav-quantity' role='tabpanel'
                        aria-labelledby='nav-quantity-tab'>
                        Change Quantity
                    </div>
                    <div className='tab-pane fade' id='nav-messages' role='tabpanel'
                        aria-labelledby='nav-messages-tab'>
                        Admin Messages
                    </div>
                </div>
            </div>
        </div>
    );
}


//const NS = 'https://library-app.local';