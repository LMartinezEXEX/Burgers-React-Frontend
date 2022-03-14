import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getIngredients } from "../actions/design";
import IngredientToAdministrate from "./IngredientToAdministrate";
import NewIngredientForm from "./NewIngredientForm";

import '../assets/css/IngredientAdministrator.css';
import sortIngredientsByType from "./sortIngredientsByType";

const IngredientAdministrator = (props) => {
    const [currentIngredients, setCurrentIngredients] = useState([]);
    const [show, setShow] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [reload, setReload] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getIngredients()).then(
            (response) => {
                const sortedIngredients = sortIngredientsByType(response);
                setCurrentIngredients(sortedIngredients);
            }
        )
    }, [reload]);

    function handleSubmitForm() {
        setReload(!reload);
    }

    let currentTypes = [];
    return (
        <div className="ing-adm-container">
            <div className="new-ingredient-form">
                <NewIngredientForm afterSubmit={handleSubmitForm}/>
            </div>

            <div className="ingredients">
            {show && (
                currentIngredients.map((ingredient, _) => {
                    if(currentTypes.includes(ingredient.type)) {
                        return <IngredientToAdministrate 
                                name={ingredient.name} 
                                id={ingredient.id}
                                price={ingredient.price}
                                />
                    }
                    else {
                        currentTypes = currentTypes.concat([ingredient.type]);
                        return (<>
                            <h3 className="type-title">{ ingredient.type }</h3>
                            <IngredientToAdministrate 
                                name={ingredient.name} 
                                id={ingredient.id}
                                price={ingredient.price}
                                />
                        </>)
                    }
                })
            )}
            </div>
        </div>
    );
};

export default IngredientAdministrator;