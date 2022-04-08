import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { addIngredient } from "../actions/mod";

import '../assets/css/NewIngredientForm.css';
import design_service from "../services/design_service";

const required = (value) => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};

const validPrice = (value) => {
    if (value < 0) {
        return (
            <div className="alert alert-danger" role="alert">
                The price must be positive!
            </div>
        )
    }
}

const NewIngredientForm = (props) => {
    const form = useRef();
    const checkBtn = useRef();

    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState("");
    const [types, setTypes] = useState([]);
    const [type, setType] = useState("TOPPING");

    const dispatch = useDispatch();

    useEffect(() => {
        design_service.getIngredientsType().then((response) => {
            setTypes(response.data);
        })
    },[]);

    const onChangeName = (e) => {
        const name = e.target.value;
        setName(name);
    };

    const onChangePrice = (e) => {
        const price = e.target.value;
        setPrice(price);
    };

    const onChangeDescription = (e) => {
        const description = e.target.value;
        setDescription(description);
    };

    const onChangeType = (e) => {
        const type = e.target.value;
        setType(type);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        form.current.validateAll();

        if(checkBtn.current.context._errors.length === 0) {
            dispatch(addIngredient(name, price, description, type))
            .then(() => {
                console.log("Ingredient added successfull");
                props.afterSubmit();
            })
            .catch(() => {
                console.error("ERROR: Couldn't add the ingredient");
            })
        }
    }

    return (
        <>
            <h4>NEW INGREDIENT</h4>
            <Form className="ingredient-form" onSubmit={handleSubmit} ref={form}>
                <div>
                    <label htmlFor="name">NAME</label>
                    <Input 
                        type="text"
                        name="name"
                        value={name}
                        onChange={onChangeName}
                        validations={[required]}
                    />
                </div>

                <div>
                    <label htmlFor="description">DESCRIPTION <span>OPTIONAL</span></label>
                    <Input 
                        type="text"
                        name="description"
                        value={description}
                        onChange={onChangeDescription}
                        validations={[]}
                    />
                </div>

                <div>
                    <label htmlFor="price">PRICE</label>
                    <Input 
                        type="number"
                        name="price"
                        value={price}
                        onChange={onChangePrice}
                        validations={[required, validPrice]}
                    />
                </div>

                <div>
                    <select name="type" onChange={onChangeType}>
                        {
                            types.map((typeOpt, _) => {
                                return <option value={typeOpt}>{ typeOpt }</option>
                            })
                        }
                    </select>
                </div>
                <div>
                    <button className="add-btn">ADD</button>
                </div>

                <CheckButton style={{display: "none"}} ref={checkBtn} />
            </Form>
        </>
    );
};

export default NewIngredientForm;