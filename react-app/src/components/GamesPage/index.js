import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from 'react-router-dom';
import { Link, Redirect, useParams } from "react-router-dom/cjs/react-router-dom.min";

import './GamesPage.css';

const GamesPage = () => {

    const user = useSelector((state) => state.session.user)

    return (
        <div>

        </div>
    )
}

export default GamesPage;
