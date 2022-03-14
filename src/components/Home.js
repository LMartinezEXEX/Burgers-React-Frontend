import React, { useState, useEffect } from "react";

import user_service from "../services/user_service";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../actions/order";
import Order from "./Order";

import '../assets/css/Home.css';
import Footer from "./Footer";
import Profile from './Profile';
import CartBilling from "./CartBilling";

const Home = () => {
    const [content, setContent] = useState("");
    const [orders, setOrders] = useState([]);

    const dispatch = useDispatch();

    const {user: currentUser} = useSelector((state) => state.auth);

    useEffect(() => {
        user_service.getPublicContent().then(
            (response) => {
                setContent(response.data);
            },
            (error) => {
                const _content = (error.response && error.response.data) ||
                                    error.message ||
                                    error.toString();

                setContent(_content);
            }
        );

        if(currentUser){
            dispatch(getOrders()).then(
                (response) => {
                    console.log("Orders getted successfull")
                    setOrders(response);
                }
            )
            .catch(() => {
                console.error("Error: Couldn't get orders from user")
            });
        }
        

    }, []);

    return (
        <div className="home-container">
            <section className="orders-section">
                <p>Ordenes realizadas:</p>
                {
                    orders.map(order => {
                        return <Order
                                street={order.street}
                                city={order.city} 
                                name={order.name} 
                                burgers={order.burgers}
                                />
                    })
                }
            </section>
            <section className="profile-section">
                <Profile />
            </section>
            <section className="cart-section">
                <CartBilling parent='Home' subtotal={ 100 }/>
            </section>
        </div>
    );

};

export default Home;