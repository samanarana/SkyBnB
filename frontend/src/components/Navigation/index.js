// frontend/src/components/Navigation/index.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

import LogoImage from './LogoImage/SkyBnBLogo.png';


function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  return (
    <ul className="navbar">
      <li className="logo">
        <NavLink to="/" exact>
        <img src={LogoImage} alt="Logo" className="logo-image" />
          skybnb
        </NavLink>
      </li>
      {isLoaded && (
        <div className="profile-create-container">
          {sessionUser && (
            <li>
              <NavLink to="/create-spot" className="create-spot-link">
                Create a New Spot
              </NavLink>
            </li>
          )}
          <li>
            <ProfileButton user={sessionUser} />
          </li>
        </div>
      )}
    </ul>
  );
}


export default Navigation;
