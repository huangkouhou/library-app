import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { AdminMessages } from "./components/AdminMessages";
import { AddNewBook } from "./components/AddNewBook";
import { ChangeQuantityOfBooks } from "./components/ChangeQuantityOfBooks";
import { SpinnerLoading } from "../Utils/SpinnerLoading";
import { Redirect } from "react-router";

export const ManageLibraryPage = () => {
  const { getIdTokenClaims } = useAuth0(); //ID Token 是给前端用来识别用户的。
  const [roles, setRoles] = useState<string[] | null>(null); // set roles to null initially
  const [loading, setLoading] = useState(true); // Loading state to handle async data

  const [activeTab, setActiveTab] = useState('addBook');

  const [changeQuantityOfBooksClick, setChangeQuantityOfBooksClick] =
    useState(false);
  const [messagesClick, setMessagesClick] = useState(false);

  useEffect(() => {
    const fetchRoles = async () => {
    const claims = await getIdTokenClaims();
    const fetchedRoles = claims?.["https://library.penghuang.dev/roles"] ?? [];
    setRoles(fetchedRoles);
    setLoading(false);//set loading to false once roles are loaded
    };
    fetchRoles();
  },[getIdTokenClaims]);

  function addBookClickFunction() {
    setChangeQuantityOfBooksClick(false);
    setMessagesClick(false);
  }

  function changeQuantityOfBooksClickFunction() {
    setChangeQuantityOfBooksClick(true);
    setMessagesClick(false);
  }

  function messagesClickFunction() {
    setChangeQuantityOfBooksClick(false);
    setMessagesClick(true);
  }

  if (loading){
    return (<SpinnerLoading/>)
  }

  if (!roles?.includes('admin')){
    return <Redirect to='/home'/>
  }

  return (
    <div className="container">
      <div className="mt-5">
        <h3>Manage Library</h3>
        <nav>
          <div className="nav nav-tabs" id="nav-tab" role="tablist">
          <button
              onClick={() => setActiveTab('addBook')}
              className={`nav-link ${activeTab === 'addBook' ? 'active' : ''}`}
              id="nav-add-book-tab"
              type="button" role="tab" aria-controls="nav-add-book"
              aria-selected={activeTab === 'addBook'}
            >
              Add new book
            </button>
            <button
              onClick={() => setActiveTab('quantity')}
              className={`nav-link ${activeTab === 'quantity' ? 'active' : ''}`}
              id="nav-quantity-tab"
              type="button" role="tab" aria-controls="nav-quantity"
              aria-selected={activeTab === 'quantity'}
            >
              Change quantity
            </button>
            <button
              onClick={() => setActiveTab('messages')}
              className={`nav-link ${activeTab === 'messages' ? 'active' : ''}`}
              id="nav-messages-tab"
              type="button" role="tab" aria-controls="nav-messages"
              aria-selected={activeTab === 'messages'}
            >
              Messages
            </button>
          </div>
        </nav>
        <div className="tab-content" id="nav-tabContent">
          <div
            className={`tab-pane fade ${activeTab === 'addBook' ? 'show active' : ''}`}
            id="nav-add-book" role="tabpanel" aria-labelledby="nav-add-book-tab"
          >
            <AddNewBook />
          </div>
          <div
            className={`tab-pane fade ${activeTab === 'quantity' ? 'show active' : ''}`}
            id="nav-quantity" role="tabpanel" aria-labelledby="nav-quantity-tab"
          >
            {activeTab === 'quantity' ? <ChangeQuantityOfBooks /> : null}
          </div>
          <div
            className={`tab-pane fade ${activeTab === 'messages' ? 'show active' : ''}`}
            id="nav-messages" role="tabpanel" aria-labelledby="nav-messages-tab"
          >
            {activeTab === 'messages' ? <AdminMessages /> : null}
          </div>
        </div>
      </div>
    </div>
  );
};


