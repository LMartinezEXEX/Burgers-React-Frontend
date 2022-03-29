import { useState } from "react";
import { connect, useDispatch } from "react-redux";


import { FiTrash } from 'react-icons/fi';
import { IconContext } from "react-icons";

import '../assets/css/Ingredient.css';
import design_service from "../services/design_service";
import { removeIngredient } from "../actions/cart";
import { removeBurgerIngredient } from "../actions/design";

const mapStateToProps = state => {
    return {
        subtotal: state.cart.subtotal
    }
}


const Ingredient = (props) => {

    const [show, setShow] = useState(true);

    const dispatch = useDispatch();

    const handleClick = (e) => {
        e.preventDefault();

        dispatch(removeBurgerIngredient(props.burgerInOrderId, props.ingredientId)).then(
            (response) => {
                setShow(false);
                console.log("Ingredient removed successfull!");
            },
            (error) => {
                console.error("Error: Couldn't remove the ingredient from the burger.");
            }
        )
    }

    return (
        <>
        {show && (
            <div className="ingredient-card">
                <p>{ props.name }</p>
                <p className={"price" + ((props.type === 'PROTEIN') ? " protein" : "")}>${props.price}</p>
                {(props.type !== 'PROTEIN') && (
                    <button className="delete-btn" onClick={handleClick}>
                        <IconContext.Provider value={{size: "18px"}}>
                            <FiTrash color="red"/>
                        </IconContext.Provider>
                    </button>
                )}
            </div>
        )}
        </>
    );
};

export default connect(mapStateToProps)(Ingredient);