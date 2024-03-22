import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from 'react-router-dom';
import { Link, Redirect, useParams } from "react-router-dom/cjs/react-router-dom.min";
import { getArt } from "../../store/arts";

import './Art.css';
import OpenModalButton from "../OpenModalButton";
import ArtUpdateModal from "../ArtUpdateModal";
import DeleteArtModal from "../DeleteArtModal";

const Art = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector((state) => state.session.user)
    const art = useSelector((state) => state.art)

    useEffect(() => {
        if (art.hydrated === false) {
            dispatch(getArt());
        }
    }, [dispatch, art])



    return (
        <div>
            {art.artPieces.map((piece) => {
                if (user) {
                    return (
                        <div className='artBlock'>
                            <div className='modalButtonContainer'>

                                <OpenModalButton
                                    className='withdrawbutton'
                                    buttonText="Edit Post"
                                    modalComponent={
                                        <ArtUpdateModal
                                            id={piece.id}
                                            name={piece.name}
                                            image={piece.image}
                                            caption={piece.caption}
                                            year={piece.year}
                                            category={piece.category}
                                            order={piece.order}
                                            notes={piece.notes}
                                        />
                                    }
                                />
                                <OpenModalButton
                                    className='withdrawbutton'
                                    buttonText="Delete Post"
                                    modalComponent={
                                        <DeleteArtModal
                                            id={piece.id}
                                        />
                                    }
                                />
                            </div>
                            <p> {piece.name}, {piece.year}, {piece.order} </p>
                            <img src={piece.image}></img>
                        </div>
                    )
                }
                return (
                    <div className='artBlock'>
                        <p> {piece.name}, {piece.year}, {piece.order} </p>
                        <img src={piece.image}></img>
                    </div>
                )
            })}
        </div>
    )
}

export default Art;
