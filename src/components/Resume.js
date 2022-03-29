import { useEffect, useRef, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { confirmOrder, getBurgers } from "../actions/design";

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import Ingredient from "./Ingredient";
import Burger from "./Burger";

import '../assets/css/Resume.css';
import CartBilling from "./CartBilling";
import design_service from "../services/design_service";
import { completeOrder } from "../actions/cart";

const mapStateToProps = state => {
    return {
        subtotal: state.cart.subtotal,
        coupon: state.cart.coupon,
        burgersRx: state.cart.burgers,
        freeDelivery: state.cart.freeDelivery
    }
}

const required = (value) => {
    if(!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};

const Resume = (props) => {
    const form = useRef();
    const checkBtn = useRef();

    const [fullName, setFullName] = useState("");
    const [street, setStreet] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [zip, setZip] = useState("");
    const [phone, setPhone] = useState("");

    const [burgers, setBurgers] = useState([]);
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();

    let navigate = useNavigate();

    useEffect(() => {
        dispatch(getBurgers()).then(response => {
            setBurgers(response);
        });
    },[]);

    function removeBurger(index) {
        let clone = [...burgers];
        clone.splice(index, 1);
        setBurgers(clone);
    }

    const onChangeFullName = (e) => {
        const fullName = e.target.value;
        setFullName(fullName);
    };
    const onChangeStreet = (e) => {
        const street = e.target.value;
        setStreet(street);
    };
    const onChangeCity = (e) => {
        const city = e.target.value;
        setCity(city);
    };
    const onChangeState = (e) => {
        const state = e.target.value;
        setState(state);
    };
    const onChangeZip = (e) => {
        const zip = e.target.value;
        setZip(zip);
    };
    const onChangePhone = (e) => {
        const phone = e.target.value;
        setPhone(phone);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        setLoading(true);

        form.current.validateAll();

        if(checkBtn.current.context._errors.length === 0) {

            dispatch(confirmOrder(fullName, street, city, state, zip, phone, props.freeDelivery)).then(
                (response) => {
                    navigate("/");
                    dispatch(completeOrder());
                    console.log("Order made succesful");
                },
                (error) => {
                    setLoading(false);
                    console.error("Error: Couldn't complete the order");
                }
            )
        } else {
            setLoading(false);
            console.error("Error: Invalid input in current form");
        }
    };

    return (
        <div className="resume">

            <div className="right-side">
            <h5>Want another masterpiece burger? <Link to="/design">Design another!</Link></h5>
                <div className="burger-list">
                    {
                        burgers.map((burger, idx) => {
                            const price = props.burgersRx.find(element => element.burgerInOrderId === burger.burgerInOrderId).price;
                            return <Burger 
                                    name={burger.name}
                                    size={burger.size}
                                    ingredients={burger.ingredients}
                                    burgerInOrderId={burger.burgerInOrderId}
                                    price={price}
                                    removeItem={removeBurger}
                                    index={idx}
                                    />
                        })
                    }
                </div>
            </div>

            <CartBilling parent='Resume'/>

            { (burgers.length < 0) ? (
                <h1> First add some incredible burgers to your order! :)</h1>
            ) : (
                <Form onSubmit={handleSubmit} ref={form} className="resume-form">

                    <div className="resume-input">
                        <label htmlFor="fullName">FULL NAME</label>
                        <Input
                            type="text"
                            name="fullName"
                            value={fullName}
                            onChange={onChangeFullName}
                            validations={[required]}
                        />
                    </div>

                    <div className="resume-input">
                        <label htmlFor="street">STREET</label>
                        <Input
                            type="text"
                            name="street"
                            value={street}
                            onChange={onChangeStreet}
                            validations={[required]}
                        />
                    </div>

                    <div className="resume-input">
                        <label htmlFor="city">CITY</label>
                        <Input
                            type="text"
                            name="city"
                            value={city}
                            onChange={onChangeCity}
                            validations={[required]}
                        />
                    </div>

                    <div className="resume-input">
                        <label htmlFor="state">STATE</label>
                        <Input
                            type="text"
                            name="state"
                            value={state}
                            onChange={onChangeState}
                            validations={[required]}
                        />
                    </div>

                    <div className="resume-input">
                        <label htmlFor="zip">ZIP</label>
                        <Input
                            type="text"
                            name="zip"
                            value={zip}
                            onChange={onChangeZip}
                            validations={[required]}
                        />
                    </div>

                    <div className="resume-input">
                        <label htmlFor="phone">PHONE NUMBER</label>
                        <Input
                            type="number"
                            name="phone"
                            value={phone}
                            onChange={onChangePhone}
                            validations={[required]}
                        />
                    </div>

                    <div className="resume-input">
                        <button disabled={loading}>
                            <span>Confirm Order</span>
                        </button>
                    </div>

                    <CheckButton style={{display: "none"}} ref={checkBtn} />
                </Form>
            )}
        </div>
    );

};

export default connect(mapStateToProps)(Resume);