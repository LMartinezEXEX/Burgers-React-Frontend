import { useState } from "react";
import coupon_service from "../services/coupon_service";

import "../assets/css/NewCouponForm.css";

const NewCouponForm = (props) => {

    const [discount, setDiscount] = useState(0);
    const [availableUntil, setAvailableUntil] = useState("2022-01-01T12:00");

    const onChangeDiscount = (e) => {
        const discount = e.target.value;
        setDiscount(discount);
    }

    const onChangeAvailableUntil = (e) => {
        const availableUntil = e.target.value;
        setAvailableUntil(availableUntil);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        coupon_service.generate(discount, availableUntil).then((response) => {
            console.log("Coupon generated succesful");
            props.afterSubmit();
        })
        .catch((error) => {
            console.error("Error: Couldn't generate coupon");
        })
    }

    return (
        <form className="coupon-generator-form" onSubmit={handleSubmit}>
            <div>
                <label htmlFor="discount">DISCOUNT</label>
                <input type="number" name="discount" value={discount} onChange={onChangeDiscount} min="0"/>
            </div>
            <div>
                <label htmlfor="date">AVAILABLE UNTIL</label>
                <input type="datetime-local" name="availableUntil" value={availableUntil} onChange={onChangeAvailableUntil}/>
            </div>
            <button className="add-btn">GENERATE</button>
        </form>
    )
};

export default NewCouponForm;