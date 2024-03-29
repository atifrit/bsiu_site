import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom";
import { getArt } from "../../store/arts";
import './ArtUpdateModal.css';

export default function ArtUpdateModal(props) {
    const dispatch = useDispatch();
    const history = useHistory();
    const art = useSelector((state) => state.art)

    useEffect(() => {
        if (!art.hydrated) {
            dispatch(getArt());
        }
    }, [dispatch, art])

    const { closeModal } = useModal();
    const art_id = props.id;
    const ogName = props.name;
    const image = props.image;
    const ogCaption = props.caption;
    const ogYear = props.year;
    const ogCategory = props.category;
    const ogOrder = props.order;
    const ogNotes = props.notes;


    const [name, setName] = useState(ogName)
    const [caption, setCaption] = useState(ogCaption)
    const [year, setYear] = useState(ogYear)
    const [category, setCategory] = useState(ogCategory)
    const [order, setOrder] = useState(ogOrder)
    const [notes, setNotes] = useState(ogNotes)
    const [errors, setErrors] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault();


        let updateRes = await fetch(`/api/art/${art_id}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({name, caption, year, category, order, notes, image})
        })
        if (updateRes.status > 400) {
            let res = await updateRes.json();
            let errorsStrings = []
            for (let el of res.errors) {
                for (let i in el) {
                    errorsStrings.push(el)
                }
            }
            setErrors(errorsStrings);
        } else {
            dispatch(getArt());
            closeModal();
        }
    }

    return (
        <div className='modal-overlay'>
            <h2 className='h2titletext'>Edit this post:</h2>
            <form onSubmit={handleSubmit}>
                <label className='displayText' htmlFor='name'>Name:</label>
                <input
                    className="signupFormInput"
                    type='text'
                    name='name'
                    value={name}
                    placeholder="Name"
                    onChange={(e) => {
                        setName(e.target.value);
                    }}
                    required
                />
                <label className='displayText' htmlFor='caption'>Caption:</label>
                <input
                    className="signupFormInput"
                    type='text'
                    name='caption'
                    value={caption}
                    placeholder="Caption"
                    onChange={(e) => {
                        setCaption(e.target.value);
                    }}
                    required
                />
                <label className='displayText' htmlFor='year'>Year:</label>
                <input
                    className="signupFormInput"
                    type='number'
                    name='year'
                    value={year}
                    onChange={(e) => {
                        setYear(e.target.value);
                    }}
                    required
                />
                <label className='displayText' htmlFor='category'>Category:</label>
                <input
                    className="signupFormInput"
                    type='text'
                    name='category'
                    value={category}
                    placeholder="Category"
                    onChange={(e) => {
                        setCategory(e.target.value);
                    }}
                    required
                />
                <label className='displayText' htmlFor='notes'>Notes:</label>
                <input
                    className="signupFormInput"
                    type='text'
                    name='notes'
                    value={notes}
                    placeholder="Notes"
                    onChange={(e) => {
                        setNotes(e.target.value);
                    }}
                />
                <label className='displayText' htmlFor='order'>Order Weight:</label>
                <input
                    className="signupFormInput"
                    type='number'
                    name='order'
                    value={order}
                    onChange={(e) => {
                        setOrder(e.target.value);
                    }}
                />

                <button type='submit'>Update</button>
            </form>
        </div>
    )




}
