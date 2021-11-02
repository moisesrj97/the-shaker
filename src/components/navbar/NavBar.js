import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sling as Hamburger } from 'hamburger-react';

import './NavBar.scss';
import { useAuth0 } from '@auth0/auth0-react';

const NavBar = () => {
  const [isOpen, setOpen] = useState(false);

  const { user, loginWithRedirect, logout } = useAuth0();

  return (
    <div className="navbar">
      <nav className="navbar__nav">
        <Link to="/">
          <svg
            width="54"
            height="62"
            viewBox="0 0 54 62"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="navbar__nav-logo"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M23.2407 55.3098L28.3516 55.2296C30.3676 55.198 32.0351 57.2711 32.0757 59.8597C32.0838 60.3776 31.7637 60.8023 31.3603 60.8086L9.45662 61.1521C9.05323 61.1585 8.71992 60.7441 8.7118 60.2261C8.6712 57.6375 10.2728 55.5132 12.2889 55.4816L17.3998 55.4014L17.1696 40.7278L1.45942 21.197C0.0144572 19.4006 0.968705 16.276 2.97198 16.2446L36.4335 15.7198C38.4368 15.6884 39.4885 18.7815 38.1006 20.6224L23.0106 40.6362L23.2407 55.3098ZM27.7501 12.1052C29.4573 5.53801 34.1968 0.751773 39.9109 0.662156C47.1692 0.548321 53.1716 8.01082 53.3178 17.3304C53.4639 26.6499 47.6985 34.297 40.4402 34.4108C37.9386 34.45 35.6093 33.5395 33.5944 32.0122L36.7476 27.8298C37.8555 28.4501 39.0706 28.8061 40.352 28.786C45.1827 28.7103 49.0343 23.6027 48.937 17.3991C48.8397 11.1954 44.8298 6.21117 39.9991 6.28693C36.7711 6.33756 34.0123 8.66059 32.5452 12.03L27.7501 12.1052ZM6.46636 20.3606L20.0269 36.5975L33.206 19.2598L6.46636 20.3606Z"
              fill="white"
            />
          </svg>
        </Link>

        <ul className="navbar__ul">
          <li className="navbar__ul-list">
            <Link to="/search">Cocktails</Link>
          </li>
          {user && (
            <>
              <li className="navbar__ul-list">
                <Link to="/favorites">Favorites</Link>
              </li>
              <li className="navbar__ul-list">
                <Link to="/custom">My Cocktails</Link>
              </li>
            </>
          )}

          {!user ? (
            <li className="navbar__ul-list" onClick={loginWithRedirect}>
              Login
            </li>
          ) : (
            <li className="navbar__ul-list" onClick={logout}>
              Logout
            </li>
          )}
        </ul>
        <div className="navbar__mobile-menu">
          <Hamburger toggled={isOpen} toggle={setOpen} />
          {isOpen && (
            <ul className="navbar__mobile-ul">
              <li className="navbar__mobile-ul-list">
                <Link to="/search">Cocktails</Link>
              </li>
              {user && (
                <>
                  <li className="navbar__mobile-ul-list">
                    <Link to="/favorites">Favorites</Link>
                  </li>
                  <li className="navbar__mobile-ul-list">
                    <Link to="/custom">My Cocktails</Link>
                  </li>
                </>
              )}

              {!user ? (
                <li
                  className="navbar__mobile-ul-list"
                  onClick={loginWithRedirect}
                >
                  Login
                </li>
              ) : (
                <li className="navbar__mobile-ul-list" onClick={logout}>
                  Logout
                </li>
              )}
            </ul>
          )}
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
