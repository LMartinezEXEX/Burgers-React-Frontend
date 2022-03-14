import { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';

import { FiTrash } from 'react-icons/fi';
import { IconContext } from "react-icons";

import '../assets/css/CartBilling.css';
import CouponInput from './CouponInput';
import coupon_service from '../services/coupon_service';
import { removeCoupon } from '../actions/cart';
import { Link } from 'react-router-dom';

const mapStateToProps = state => {
    return {
        subtotal: state.cart.subtotal,
        coupon: state.cart.coupon,
        freeDelivery: state.cart.freeDelivery
    };
};

const CartBilling = (props) => {
    const delivery = 120;

    const dispatch = useDispatch();

    function calculateTotal() {
        var total = props.subtotal + delivery - props.coupon;
        if(props.freeDelivery){
            total -= delivery;
        }

        return total;
    }

    const handleRemoveCoupon = (e) => {

        coupon_service.removeCoupon().then((response) => {
            console.log("Coupon removed succesful");
            dispatch(removeCoupon())
        })
        .catch((error) => {
            console.error("Error: Couldn't remove coupon", error);
        })
    }

    return (
        <div className={props.parent}>
            <div className="cart-billing-container">
                <div className="subtotal right">
                    <p>SUBTOTAL</p>
                    <h4 className='price'>${props.subtotal}</h4>
                </div>

                <div className="delivery right">
                    <p>DELIVERY</p>
                    <h4 className='price'>${delivery}</h4>
                </div>

                {props.freeDelivery && (
                    <div>
                        <p>FREE DELIVERY</p>
                        <h4 className='price'>-${delivery}</h4>
                    </div>
                )}

                {(props.coupon !==0) && (
                    <div className="coupon right">
                        <p>COUPON</p>
                        <button className='delete-btn' onClick={handleRemoveCoupon}>
                            <IconContext.Provider value={{size: "18px"}}>
                                <FiTrash color="red"/>
                            </IconContext.Provider>
                        </button>
                        <h4 className='price push'>-${props.coupon}</h4>
                    </div>
                )}

                <div className="total right">
                    <p>Total</p>
                    <h4 className='total-price'>${calculateTotal()}</h4>
                </div>
            </div>

            <CouponInput />

            {props.parent === 'Home' && (
                <div className='link-container'>
                    <Link to={"/resume"} className="go-to-resume">
                        Resume
                    </Link>
                </div>
            )}
        </div>
    );
};

export default connect(mapStateToProps)(CartBilling);