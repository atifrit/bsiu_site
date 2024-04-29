import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from 'react-router-dom';
import { Link, Redirect, useParams } from "react-router-dom/cjs/react-router-dom.min";

import './LandingPage.css';

let lineDict = {
    '0': 'chronic misplacer of sunglasses',
    '1': 'snack hoarder',
    '2': 'videogame lover',
    '3': 'fridge magnet collector',
    '4': 'certified Area Man',
    '5': 'sleep enjoyer',
    '6': 'connoisseur of baggy clothing',
    '7': 'black thumb'
}


const LandingPage = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user)


    let randVal = Math.floor(Math.random() * 8).toString();


    return (
        <div className="landing-container">
            <div className='landing-page'>
                <div className='introLine'>
                    <h1 className='landingPageTitleText'>Beverly Siu</h1>
                    <h2 className='landingPageSubText'>multidisciplinary artist and {lineDict[randVal]}</h2>
                </div>
                <div className='landing-links'>
                    <div className="oddRow">
                        <NavLink className='navLink' to='/art'>
                            <img src={require('/home/atifrit/aa-projects/websites/bsiu_site/react-app/src/images/SHO_landing.JPG')} width={'200px'} height={'100px'} alt="cartoon of girl and cat looking at mailbox with vibrating package labeled 'definitely not bees'"></img>
                        </NavLink>
                        <NavLink to='/art'>
                            <img src={require('/home/atifrit/aa-projects/websites/bsiu_site/react-app/src/images/crochet_landing.JPG')} width={'100px'} height={'100px'} alt="distorted image of woman with hands on shoulders facing right with eyes closed"></img>
                        </NavLink>
                    </div>
                    <div className='evenRow'>

                        <NavLink className='navLink' to='/art'>
                            <img src={require('/home/atifrit/aa-projects/websites/bsiu_site/react-app/src/images/vfx_landing.JPG')} width={'100px'} height={'100px'} alt="distorted image of woman with hands on shoulders facing right with eyes closed"></img>
                        </NavLink>
                        <NavLink to='/art'>
                            <img src={require('/home/atifrit/aa-projects/websites/bsiu_site/react-app/src/images/bees_landing.JPG')} width={'200px'} height={'100px'} alt="cartoon of girl and cat looking at mailbox with vibrating package labeled 'definitely not bees'"></img>
                        </NavLink>
                    </div>
                    <div className="oddRow">
                        <NavLink className='navLink' to='/art'>
                            <img src={require('/home/atifrit/aa-projects/websites/bsiu_site/react-app/src/images/dog_landing.JPG')} width={'200px'} height={'100px'} alt="cartoon of girl and cat looking at mailbox with vibrating package labeled 'definitely not bees'"></img>
                        </NavLink>
                        <NavLink to='/art'>
                            <div className='shopcontact'>
                                <div className="shopcontacttextcontainer">
                                    <p className='shopcontactText'>shop + contact</p>
                                </div>
                            </div>
                        </NavLink>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LandingPage
