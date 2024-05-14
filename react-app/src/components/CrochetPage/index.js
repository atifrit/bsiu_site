import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from 'react-router-dom';
import { Link, Redirect, useParams } from "react-router-dom/cjs/react-router-dom.min";
import { getArt } from "../../store/arts";

import '../Art/Art.css';
import OpenModalButton from "../OpenModalButton";
import ArtUpdateModal from "../ArtUpdateModal";
import DeleteArtModal from "../DeleteArtModal";

const Crochet = () => {
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
        <div className='pageContainer'>
            <div className='artContainer'>
                {art.artPieces.map((piece) => {
                    if (user) {
                        if (piece.category === 'crochet') {
                            return (
                                <div className='gamePost'>
                                    <img className='gameImage' src={piece.image}></img>
                                    <h3 className='gameName'>{piece.name}</h3>
                                    <h4 className='gameCaption'>{piece.caption}</h4>
                                    <h4 className='gameCaption'>{piece.year}</h4>
                                    <h4 className='gameCaption'>Order Weight: {piece.order}</h4>
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
                                </div>
                            )
                        }
                    }

                    if (piece.category === 'crochet') {
                        return (
                            <div className='gamePost'>
                                <img className='gameImage' src={piece.image}></img>
                                <h3 className='gameName'>{piece.name}</h3>
                                <h4 className='gameCaption'>{piece.caption}</h4>
                                <h4 className='gameCaption'>{piece.year}</h4>
                            </div>
                        )
                    }
                })}
            </div>
        </div>
    )
}

export default Crochet;
