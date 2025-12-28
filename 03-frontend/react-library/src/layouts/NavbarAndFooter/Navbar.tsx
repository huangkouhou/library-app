import { NavLink } from "react-router-dom";
import { SpinnerLoading } from "../Utils/SpinnerLoading";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";

export const Navbar = () => {
  const [roles, setRoles] = useState<string[] | null>(null);
  const [loading, setLoading] = useState(true); // Loading state to handle async data
  const { 
    isAuthenticated, 
    loginWithRedirect, 
    logout, 
    getIdTokenClaims,
    getAccessTokenSilently 

  } =
    useAuth0();

  useEffect(() => {
    const fetchRoles = async () => {
      if (!isAuthenticated) {
        // 未登录直接清空并结束 loading
        setRoles(null);
        setLoading(false);
        return;
      }
      const claims = await getIdTokenClaims();
      const fetchedRoles = claims?.["http://localhost:3000/roles"] ?? [];
      setRoles(fetchedRoles);
      setLoading(false);
    };
    fetchRoles();
  }, [isAuthenticated, getIdTokenClaims]);


  useEffect(() => {
    const getAndLogToken = async () => {
      // 只有在用户已登录时才执行获取 Token 的操作
      if (isAuthenticated) {
        try {
          const token = await getAccessTokenSilently();
          console.log(
            "Access Token for Postman (auto-logged on auth change):",
            token
          );
        } catch (e: any) {
          console.error("Error getting access token", e.message);
        }
      }
    };

    getAndLogToken();
  }, [isAuthenticated, getAccessTokenSilently]); // 依赖数组，当 isAuthenticated 变化时执行

  if (loading) {
    return <SpinnerLoading />;
  }

  const handleLogout = () => {
    console.log("handleLogout");
    logout({ logoutParams: { returnTo: window.location.origin } });
  };

  const handleLogin = () =>
    loginWithRedirect({ appState: { returnTo: "/home" } });

  console.log("isAuthenticated: ", isAuthenticated);
  return (
    <nav className="navbar navbar-expand-lg navbar-dark main-color py-3">
      <div className="container-fluid">
        <span className="navbar-brand">Luv 2 Read</span>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarDropdown"
          aria-controls="navbarDropdown"
          aria-expanded="false"
          aria-label="Toggle Navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarDropdown">
          <ul className="navbar-nav">
            <li className="navbar-item">
              <NavLink className="nav-link" to={"/home"}>
                Home
              </NavLink>
            </li>
            <li className="navbar-item">
              <NavLink className="nav-link" to={"/search"}>
                Search Books
              </NavLink>
            </li>

            {isAuthenticated && (
              <li className="nav-item">
                <NavLink className="nav-link" to={"/shelf"}>
                  Shelf
                </NavLink>
              </li>
            )}

            {isAuthenticated && (
              <li className="nav-item">
                <NavLink className="nav-link" to={"/fees"}>
                  Pay fees
                </NavLink>
              </li>
            )}

            {isAuthenticated && roles?.some(r => r.toLowerCase() === "admin") && (
              <li className="nav-item">
                <NavLink className="nav-link" to="/admin">
                  Admin
                </NavLink>
              </li>
            )}
          </ul>
          <ul className="navbar-nav ms-auto">
            {!isAuthenticated ? (
              <li className="nav-item m-1">
                <button className="btn btn-outline-light" onClick={handleLogin}>
                  Sign in
                </button>
              </li>
            ) : (
              <li>
                <button
                  className="btn btn-outline-light"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};
