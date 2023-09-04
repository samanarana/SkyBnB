// frontend/src/components/Navigation/ProfileButton.js
import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import * as sessionActions from '../../store/session';
import OpenModalButton from '../OpenModalButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  const openDropdownAfterSignup = () => {
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    history.push('/');
    setShowMenu(false);
  };

  const ulClassName = `profile-dropdown ${user ? 'loggedin' : ''}` + (showMenu ? "" : " hidden");


  return (
    <>
      <button className="profile-button-new" onClick={openMenu}>
        <div className="hamburger-icon">
        <span></span>
        <span></span>
        <span></span>
  </div>
      <i className="fas fa-user-circle" />
      </button>
      <ul className={`${ulClassName} ${user ? 'after-login' : ''}`} ref={ulRef}>
      {user ? (
          <>
            <li>Hello, {user.username}</li>
            <li className="email">{user.email}</li>
            <li className="manage-spots"><Link to="/manage-spots">Manage Spots</Link></li>
            <li className="logout">
              <button className="dropdown-logout-button" onClick={logout}>Log Out</button>
            </li>
          </>
        ) : (
          <>
            <li className="before-login">
              <OpenModalButton
                buttonText="Sign Up"
                modalComponent={<SignupFormModal openDropdownAfterSignup={openDropdownAfterSignup} />}
                closeDropdown={() => setShowMenu(false)}
              />
            </li>
            <li className="before-login">
              <OpenModalButton
                buttonText="Log In"
                modalComponent={<LoginFormModal />}
                closeDropdown={() => setShowMenu(false)}
              />
            </li>
          </>
        )}
      </ul>
    </>
  );
}

export default ProfileButton;
