import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from 'react-router-dom';
import { Link, Redirect, useParams } from "react-router-dom/cjs/react-router-dom.min";
import { getArt } from "../../store/arts";

import './Art.css';

const Art = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector((state) => state.session.user)
    const art = useSelector((state) => state.art)

    useEffect(() => {
        if (art.length === 0) {
            console.log(art)
            dispatch(getArt());
        }
    }, [dispatch, art])

    return (
        <div>
            hello
            {art.map((piece) => {
                return (
                    <div className='artBlock'>
                        <p> {piece.name}, {piece.year}, {piece.order} </p>
                    </div>
                )
            })}
        </div>
    )
}

export default Art;
