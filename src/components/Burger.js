import { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import Ingredient from "./Ingredient";

import { FiTrash } from 'react-icons/fi';
import { IconContext } from "react-icons";

import '../assets/css/Burger.css'
import design_service from "../services/design_service";
import { sortBurgerElementsForShow } from "../helpers/sorters";
import { removeDesign } from "../actions/design";
import { removeBurger } from "../actions/cart";

const mapStateToProps = state => {
    return {
        subtotal: state.cart.subtotal,
        types: state.design.types
    }
}

const Burger = (props) => {
    const [show, setShow] = useState(true);
    const [sortedIngredients, setSortedIngredients] = useState([]);
    const [types, setTypes] = useState([]);
    const sortedElements = sortBurgerElementsForShow(props.size, props.ingredients, props.types)

    const dispatch = useDispatch();

    useEffect(() => {
        findTypes();
    },[]);

    useEffect(() => {
        sortIngredients();
    }, [types]);
    
    function findTypes() {
        var f_types = [];
        props.ingredients.map((item, _) => {
            if(f_types.indexOf(item.type) <= -1){
                f_types = f_types.concat([item.type]);
            }
        });

        setTypes(f_types);
    }

    function sortIngredients() {
        let sorted = [];
        let type_dict = {};
        for(var i = 0; i < types.length; i++){
            if(types[i] === 'PROTEIN') {
                continue;
            }
            var list = props.ingredients.filter(ingredient => ingredient.type === types[i]);
            type_dict[types[i]] = list.sort(function(a, b) {
                if(a.name.toLowerCase() < b.name.toLowerCase()) return -1;
                if(a.name.toLowerCase() > b.name.toLowerCase()) return 1;
                return 0;
               });
        }

        sorted = sorted.concat(props.ingredients.filter(ingredient => ingredient.type === 'PROTEIN'));
        Object.keys(type_dict).map(type => {
            sorted = sorted.concat(type_dict[type])
        });
        setSortedIngredients(sorted);
    };


    const handleDeleteBurger = (e) => {
        e.preventDefault();

        dispatch(removeDesign(props.burgerInOrderId)).then(
            (response) => {
                setShow(false);
                props.removeItem(props.index);
                dispatch(removeBurger(response));
                console.log("Burger removed successfull!");
            },
            (error) => {
                console.error("Error: Couldn't remove burger from current order");
            }
        )
    };
    
    return (
        <>
        {show && (
            <div className="burger-card">
                <div className="name-delete-burger">
                    <h5>{ props.name }</h5>

                    <p className="price">${props.price}</p>

                    <button className="delete-btn" onClick={handleDeleteBurger}>
                        <IconContext.Provider value={{size: "20px"}}>
                            <FiTrash color="red"/>
                        </IconContext.Provider>
                    </button>
                </div>

                {sortedElements.map((element, idx) => {
                    if(idx !== 0 && idx !== 1){
                        return <Ingredient
                                name={element.name}
                                burgerInOrderId={props.burgerInOrderId}
                                ingredientId={element.id}
                                type={element.type}
                                price={element.price} 
                            />
                    } else {
                        return (
                            <div className="undeletable-ingredients">
                                <p>{element.name}</p>
                                {element.price !== 0 && (
                                    <p className="price">${element.price}</p>
                                )}
                            </div>
                        )
                    }
                })}
            </div>
        )}
        </>
    );
};

export default connect(mapStateToProps)(Burger);