import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from 'react-router-dom';
import { Link, Redirect, useParams } from "react-router-dom/cjs/react-router-dom.min";

import './LandingPage.css';

const LandingPage = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user)



    return (
        <div className='landing-page'>
            <div className='landing-links'>
                <NavLink to='/shop'>
                    Shop
                </NavLink>
                <NavLink to='/art'>
                    Art
                </NavLink>
                <NavLink to='/games'>
                    Game Art
                </NavLink>
            </div>
        </div>
    )
}

export default LandingPage
