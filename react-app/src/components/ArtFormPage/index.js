import React, { useEffect, useRef, useState } from "react";
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
    const [image, setImage] = useState(null);
    const [caption, setCaption] = useState('');
    const [year, setYear] = useState(0);
    const [category, setCategory] = useState('');
    const [notes, setNotes] = useState('');
    const [showMenu, setShowMenu] = useState(false);
    const [errors, setErrors] = useState([])
    const inputRef = useRef();


    useEffect(() => {
        if (art.hydrated === false) {
            dispatch(getArt());
        }
    }, [dispatch, art]);


    const blobToBase64 = blob => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
      });




    const handleSubmit = async (e) => {
        e.preventDefault();

        let order = (art.artPieces.length + 1) * 1024

        let art_response = await fetch('/api/art/', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({name, image, caption, year, category, order, notes})
        })

        if (art_response.status > 400) {
            let res = await art_response.json();
            let errorsStrings = []
            for (let el of res.errors) {
                for (let i in el) {
                    errorsStrings.push(el)
                }
            }
            setErrors(errorsStrings);
        } else {
            dispatch(getArt());
            history.push('/art')
        }




    }

    return (
        <div className='postArt'>
            <form onSubmit={handleSubmit}>
                <label htmlFor="imageUpload">Image: </label>
                <input
                name='imageUpload'
                ref={inputRef}
                type='file' accept='.png, .gif, .jpg, .jpeg'
                onChange={async () => {
                    let reader = new FileReader();
                    setImage(await blobToBase64(inputRef.current.files[0]));
                    console.log(image);
                }}
                ></input>
                <label htmlFor="caption">Caption: </label>
                <input
                name='caption'
                type='text'
                value={caption}
                onChange={(e)=> setCaption(e.target.value)}
                ></input>
                <label htmlFor="name">Name: </label>
                <input
                name='name'
                type='text'
                value={name}
                onChange={(e)=> setName(e.target.value)}
                ></input>
                <label htmlFor="year">Year: </label>
                <input
                name='year'
                type='number'
                value={year}
                onChange={(e)=> setYear(e.target.value)}
                ></input>
                <label htmlFor="category">Category: </label>
                <input
                name='category'
                type='text'
                value={category}
                onChange={(e)=> setCategory(e.target.value)}
                ></input>
                <label htmlFor="notes">Notes: </label>
                <input
                name='notes'
                type='text'
                value={notes}
                onChange={(e)=> setNotes(e.target.value)}
                ></input>

                <div className="buttonContainer">
                    <button className="submitButton" type='submit' disabled={!image || category.length < 4}>Post</button>
                </div>

            </form>
        </div>
    )


}

export default ArtFormPage;
