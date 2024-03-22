import React, { useState, useEffect} from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import './DeleteArtModal.css';
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { getArt } from "../../store/arts";

export default function DeleteArtModal(props) {
    let artId = props.id;
    const dispatch = useDispatch();
    const history = useHistory();
    const [errors, setErrors] = useState([]);
    const { closeModal } = useModal();

    const handleCancel = async (e) => {
        e.preventDefault()
        closeModal()
    }

    const handleDelete = async (e) => {
        e.preventDefault();

        let response = await fetch(`/api/art/${artId}`, {method:'DELETE'})
        if (response.status > 400) {
            let data = await response.json();
            let errorsStrings = []
            for (let el of data.errors) {
                for (let i in el) {
                    errorsStrings.push(el)
                }
            }
            setErrors(errorsStrings);
        } else {
            let data = await response.json()
            dispatch(getArt())
            closeModal()
        }
    }

    return (
        <div className="modal-overlay">
        <div className="refundform">
            <h1 className="h1title">Are you sure you would like to delete this post?</h1>
                <button className="withdrawbutton" onClick={handleDelete}>Delete</button>
                <button className="cancel" onClick={handleCancel}>Cancel</button>
        </div>
        </div>
    )

}
