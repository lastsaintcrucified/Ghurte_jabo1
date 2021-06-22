import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../context/auth-context.js";
import "./navLinks.styles.css";

const NavLinks = (props) => {
  const auth = useContext(AuthContext);
  const handleLogOut = () => {
    auth.logout();
  };
  return (
    <ul className={`nav_link ${props.className}`}>
      <li>
        <NavLink to="/" exact>
          All Users
        </NavLink>
      </li>
      {auth.isLoggedIn && (
        <li>
          <NavLink to="/u1/places">My Places</NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
          <NavLink to="/places/new">Add Places</NavLink>
        </li>
      )}
      {!auth.isLoggedIn && (
        <li>
          <NavLink to="/auth">Authenticate</NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
          <NavLink to="/auth" onClick={handleLogOut}>
            LogOut
          </NavLink>
        </li>
      )}
    </ul>
  );
};

export default NavLinks;
