import { useEffect, useRef, useState } from "react";
import { connect, useDispatch } from "react-redux";

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import { addDesign, getIngredients, confirmOrder, saveTypes } from "../actions/design"
import { useNavigate } from "react-router-dom";

import '../assets/css/Design.css';
import { addBurger } from "../actions/cart";
import design_service from "../services/design_service";

const mapStateToPros = state => {
    return {
        subtotal: state.cart.subtotal
    }
};

const required = (value) => {
    if(!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};

const Design = (props) => {
    const form = useRef();
    const checkBtn = useRef();

    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);
    const [protein, setProtein] = useState([]);
    const [ingredients, setIngredients] = useState([]);
    const [selectedIngredients, setSelectedIngredients] = useState([]);
    const [categoryIngredients, setCategoryIngredients] = useState({});
    const [sizes, setSizes] = useState([]);
    const [size, setSize] = useState("");

    const dispatch = useDispatch();

    let navigate = useNavigate();

    useEffect(() => {
        dispatch(getIngredients()).then(respone => {
            setIngredients(respone);
        });
        design_service.getBurgerSizes().then((response) => {
            setSizes(response.data);
        })
        design_service.getIngredientsType().then((response) => {
            saveTypes(response.data)
        })
    }, []);

    useEffect(() => {
        separateIngredients();
    }, [ingredients])

    function separateIngredients() {
        let newCategoryIngredients = {};
        ingredients.map((item, idx) => {
            if(item.type in newCategoryIngredients){
                var newIngredients = newCategoryIngredients[item.type].concat(item);
                newCategoryIngredients[item.type] = newIngredients;
            } else {
                newCategoryIngredients[item.type] = [item];
            }
        });
        setCategoryIngredients(newCategoryIngredients);
    };

    const onChangeName = (e) => {
        const name = e.target.value;
        setName(name);
    };

    const onCheckIngredient = (e) => {
        const ingredient = (e.target.name === 'protein') ? e.target.value : e.target.name;

        if(e.target.type === 'radio'){
            setProtein([ingredient]);
        } else {
            if(e.target.checked){
                if(!selectedIngredients.includes(ingredient)){
                    const newIngredients = selectedIngredients.concat(ingredient);
                    setSelectedIngredients(newIngredients);
                }
            } else {
                const newIngredients = selectedIngredients.filter(function(i) {
                    return i !== ingredient;
                });
                setSelectedIngredients(newIngredients);
            }
        }
    };

    const onCheckSize = (e) => {
        const size = e.target.value;
        setSize(size);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        setLoading(true);

        form.current.validateAll();

        if(checkBtn.current.context._errors.length === 0) {
            dispatch(addDesign(name, size, selectedIngredients.concat(protein)))
            .then((response) => {
                console.log("Burger added succesful")
                
                dispatch(addBurger(response.data))
                navigate("/resume");
            })
            .catch((error) => {
                setLoading(false);
                console.error("Error: Couldn't add burger");
            });
        } else {
            setLoading(false);
        }
    };

    return (
        <div>
            <Form onSubmit={handleSubmit} ref={form}>

                <div className="name-container" spellCheck='false'>
                    <label htmlFor="name">Name of this masterpiece:</label>
                    <Input 
                        type="text"
                        placeholder="It's called..."
                        className="name-input"
                        name="name"
                        value={name}
                        onChange={onChangeName}
                        validations={[required]}
                    />
                </div>

                <div className="ingredients size-container">
                    <h4 className="sizes">SIZES</h4>
                    {sizes.map((size, _) => {
                        return(
                            <div className="ingredient">
                                <label htmlFor={size.name}>
                                    <span>{ size.name }</span>
                                    <p className="ingredient-price">${ size.price }</p>
                                    <input 
                                        type="radio"
                                        name="size"
                                        value={size.name}
                                        onChange={onCheckSize}
                                    />
                                    <span className="checkmark"></span>
                                </label>
                            </div>
                        );
                    })}
                </div>

                <div className="ingredients">
                    {Object.keys(categoryIngredients).map((type, idx) => {
                        if(type === 'PROTEIN') {
                            return (
                                <div className="type-container">
                                    <h4>{ type }</h4>
                                    {ingredients.map((item, _) => {
                                        if(item.type === type){
                                            return (
                                                <div className="ingredient">
                                                    <label htmlFor={item.name}>
                                                        <span>{ item.name }</span>
                                                        <p className="ingredient-price">${ item.price }</p>
                                                        <input 
                                                            type="radio"
                                                            name="protein"
                                                            value={item.name}
                                                            onChange={onCheckIngredient}
                                                        />
                                                        <span className="checkmark"></span>
                                                    </label>
                                                </div>
                                            )
                                        }
                                    })}
                                </div>
                            )
                        } else return(
                            <div className="type-container">
                                <h4>{ type }</h4>
                                {ingredients.map((item, _) => {
                                    if(item.type === type){
                                        return (
                                            <div className="ingredient">
                                                <label htmlFor={item.name}>
                                                    <span>{ item.name }</span>
                                                    <p className="ingredient-price">${ item.price }</p>
                                                    <input
                                                        type="checkbox"
                                                        name={item.name}
                                                        onChange={onCheckIngredient}
                                                    />
                                                    <span className="checkmark"></span>
                                                </label>
                                            </div>
                                        )
                                    }
                                })}
                            </div>
                        )
                    })}
                </div>

                <div className="btn-container">
                    <button className="add-btn" disabled={loading}>
                        <span>Add Burger</span>
                    </button>
                </div>

                <CheckButton style={{display: "none"}} ref={checkBtn} />
            </Form>
        </div>
    );

};

export default connect(mapStateToPros)(Design);