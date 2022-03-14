import React, { useEffect, useState } from "react";
import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";

import { CircularProgressbar, buildStyles} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import '../assets/css/Profile.css';
import user_service from "../services/user_service";
import design_service from "../services/design_service";
import { applyFreeDelivery } from "../actions/cart";

const Profile = () => {
    const {user: currentUser} = useSelector((state) => state.auth);
    const freeDeliveryPercent = 80;
    const [deliveryPoints, setDeliveryPoints] = useState(0);

    const dispatch = useDispatch();

    useEffect(() => {
        user_service.getDeliveryPoints().then((response) => {
            setDeliveryPoints(response.data);
            console.log("Current delivery points: ", response.data);
        })
    },[]);
    
    if (!currentUser) {
        console.log("No current user!");
        return <Navigate to="/login" />;
    }

    return (
        <div>
            <header>
                <h3>
                    <strong>{currentUser.username}</strong>
                </h3>
            </header>
            <p>
                <strong>Email:</strong> {currentUser.email}
            </p>
            <div className="free-delivery-section">
                <div className="free-delivery-progress-bar">
                    <CircularProgressbar 
                        value={(deliveryPoints * 10)} 
                        text={`${deliveryPoints * 10}%`}
                        styles={buildStyles({
                            strokeLinecap: 'butt',
                            textSize: '27px',
                        })}
                        />
                </div>
                <button disabled={(deliveryPoints !== 10)} onClick={() => dispatch(applyFreeDelivery())} >Envio gratis!</button>
            </div>
        </div>
    );
};

export default Profile;