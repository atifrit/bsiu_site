import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from 'react-router-dom';
import { Link, Redirect, useParams } from "react-router-dom/cjs/react-router-dom.min";
import { getArt } from "../../store/arts";

import './ArtFormPage.css';

const ArtFormPage = () => {
    const dispatch = useDispatch();
    const history = useHistory()
    const user = useSelector((state) => state.session.user);
    const art = useSelector((state) => state.art)
    const [name, setName] = useState("");
    const [image, setImage] = useState('');
    const [caption, setCaption] = useState('');
    const [year, setYear] = useState();
    const [category, setCategory] = useState('');
    const [notes, setNotes] = useState('');
    const [showMenu, setShowMenu] = useState(false);
    const { closeModal } = useModal();

    useEffect(() => {
        if (art.hydrates === false) {
            dispatch(getArt());
        }
    }, [dispatch, art])



}
