import { useRef, useState } from "react";
import { connect, useDispatch } from "react-redux";

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import coupon_service from "../services/coupon_service";
import { applyCoupon } from "../actions/cart";

import '../assets/css/CouponInput.css';

const mapStateToProps = state => {
    return {
        coupon: state.cart.coupon
    }
}

const correctLength = (value) => {
    if(value.length !== 6){
        return (
            <div className="alert alert-danger" role="alert">
                This field must be 6 charachters long!
            </div>
        );
    }
};

const CouponInput = (props) => {
    const form = useRef();
    const checkBtn = useRef();

    const [code, setCode] = useState("");

    const dispatch = useDispatch();

    const onChangeCode = (e) => {
        const code = e.target.value.toUpperCase();
        setCode(code);
    };

    const handleApplyCoupon = (e) => {
        e.preventDefault();

        form.current.validateAll();

        if(checkBtn.current.context._errors.length === 0) {
            coupon_service.applyCoupon(code).then((response) => {
                console.log(response.data)

                dispatch(applyCoupon(response.data));
                console.log("Coupon applied succesful");
            })
            .catch((error) => {
                console.error("Error: Couldn't apply the coupon");
            })
        }
    }

    return (
        <Form onSubmit={handleApplyCoupon} ref={form} className="coupon-form">
            <label htmlFor="coupon">COUPON</label>
            <div className="input-container">
                <input type="text" name="coupon" value={code} onChange={onChangeCode} minLength="6" maxLength="6" spellCheck="false" autoComplete="off"/>

                <button>Aplicar</button>
            </div>
            <CheckButton style={{display: "none"}} ref={checkBtn} />
        </Form>
    );
};

export default connect(mapStateToProps)(CouponInput);