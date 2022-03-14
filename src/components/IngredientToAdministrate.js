import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteIngredient } from "../actions/mod";

import { FiTrash } from 'react-icons/fi';
import { IconContext } from "react-icons";

import '../assets/css/IngredientToAdministrate.css';

const IngredientToAdministrate = (props) => {

    const [show, setShow] = useState(true);

    const dispatch = useDispatch();

    const handleDelete = (e) => {
        dispatch(deleteIngredient(props.id))
        .then(
            () => {
                console.log("Ingredient deleted successful");
                setShow(false);
            }
        )
        .catch(
            () => {
                console.error("ERROR: couldn't delete the ingredient");
            }
        )
    };

    return (
        <div className="ing-to-admin">
            {show && (
                <>
                    <h4>{ props.name }</h4>
                    <p className="price">${ props.price }</p>
                    <button onClick={handleDelete}>
                        <IconContext.Provider value={{size: "17px"}}>
                            <FiTrash color="red"/>
                        </IconContext.Provider>
                    </button>
                </>
            )}
            
        </div>
    );
};

export default IngredientToAdministrate;