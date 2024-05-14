import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from 'react-router-dom';
import { logout } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  const closeMenu = () => setShowMenu(false);

  return (
    <>
      <button className='hamburgerButton' onClick={openMenu}>
      <i class="fas fa-bars"></i>
      </button>
      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <>
            <li>{user.username}</li>
            <li>{user.email}</li>
            <div>
              <button onClick={handleLogout}>Log Out</button>
            </div>
            <div><NavLink className='hamburgerLinks' exact to="/art">painting + drawing</NavLink></div>
            <div><NavLink className='hamburgerLinks' exact to="/games">videogame art</NavLink></div>
            <div><NavLink className='hamburgerLinks' exact to="/vfx">compositing</NavLink></div>
            <div><NavLink className='hamburgerLinks' exact to="/crochet">crochet</NavLink></div>
            <div><NavLink className='hamburgerLinks' exact to="/shop">shop + contact</NavLink></div>
            <div><NavLink className='hamburgerLinks' exact to="/artformpage">Post</NavLink></div>

          </>
        ) : (
          <>
            <div><NavLink className='hamburgerLinks' exact to="/art">painting + drawing</NavLink></div>
            <div><NavLink className='hamburgerLinks' exact to="/games">videogame art</NavLink></div>
            <div><NavLink className='hamburgerLinks' exact to="/vfx">compositing</NavLink></div>
            <div><NavLink className='hamburgerLinks' exact to="/crochet">crochet</NavLink></div>
            <div><NavLink className='hamburgerLinks' exact to="/shop">shop + contact</NavLink></div>
            <div><NavLink className='hamburgerLinks' exact to="/login">Login</NavLink></div>

            <OpenModalButton
              buttonText="Sign Up"
              onItemClick={closeMenu}
              modalComponent={<SignupFormModal />}
            />
          </>
        )}
      </ul>
    </>
  );
}

export default ProfileButton;
