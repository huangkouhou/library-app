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

  const [activeTab, setActiveTab] = useState<"add" | "quantity" | "messages">(
    "add"
  );

  useEffect(() => {
    const fetchRoles = async () => {
      const claims = await getIdTokenClaims();
      const fetchedRoles = claims?.["https://library-app.local/roles"] ?? [];
      setRoles(fetchedRoles);
      setLoading(false); //set loading to false once roles are loaded
    };
    fetchRoles();
  }, [getIdTokenClaims]);

  if (loading) {
    return <SpinnerLoading />;
  }

  if (!roles?.includes("admin")) {
    return <Redirect to="/home" />;
  }

  return (
    <div className="container">
      <div className="mt-5">
        <h3>Manage Library</h3>
        <nav>
          <div className="nav nav-tabs" id="nav-tab" role="tablist">
            <button
              onClick={() => setActiveTab("add")}
              className={`nav-link ${activeTab === "add" ? "active" : ""}`}
              type="button"
            >
              Add new book
            </button>
            <button
              onClick={() => setActiveTab("quantity")}
              className={`nav-link ${activeTab === "quantity" ? "active" : ""}`}
              type="button"
            >
              Change quantity
            </button>
            <button
              onClick={() => setActiveTab("messages")}
              className={`nav-link ${activeTab === "messages" ? "active" : ""}`}
              type="button"
            >
              Messages
            </button>
          </div>
        </nav>
        <div className="tab-content" id="nav-tabContent">
          {activeTab === "add" && (
            <div className="tab-pane fade show active">
              <AddNewBook />
            </div>
          )}
          {activeTab === "quantity" && (
            <div className="tab-pane fade show active">
              <ChangeQuantityOfBooks />
            </div>
          )}
          {activeTab === "messages" && (
            <div className="tab-pane fade show active">
              <AdminMessages />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

//const NS = 'https://library-app.local';
