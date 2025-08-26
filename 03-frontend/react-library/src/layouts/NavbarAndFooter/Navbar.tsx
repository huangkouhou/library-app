import { NavLink } from "react-router-dom";
import { SpinnerLoading } from "../Utils/SpinnerLoading";
import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useState } from "react";

export const Navbar = () => {
  const [roles, setRoles] = useState<string[] | null>(null);
  const [loading, setLoading] = useState(true); // Loading state to handle async data
  const { isAuthenticated, loginWithRedirect, logout, getIdTokenClaims } =
    useAuth0();

  useEffect(() => {
    const fetchRoles = async () => {
      const claims = await getIdTokenClaims();
      const fetchedRoles =
        claims?.["https://luv2code-react-library.com/roles"] || [];
      setRoles(fetchedRoles);
      setLoading(false); // Set loading to false once roles are loaded
    };

    fetchRoles();
  }, [isAuthenticated, getIdTokenClaims]);

  if (loading) {
    return <SpinnerLoading />;
  }

  const handleLogout = () => {
    console.log("handleLogout");
    logout({ logoutParams: { returnTo: window.location.origin } });
  };

  const handleLogin = () => {
    loginWithRedirect(); //调用 Auth0 的登录：跳到 Auth0 登录页
    window.location.assign("/"); //立刻把浏览器重定向到站点根路径（整页刷新）
  };

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
                <NavLink className="nav-link" to="/shelf">
                  Shelf
                </NavLink>
              </li>
            )}

            {isAuthenticated && roles?.includes("admin") && (
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
