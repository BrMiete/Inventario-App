import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './EditProduct.style.css';

const EditProduct = () => {
    const [product, setProduct] = useState({
        name: '',
        quantity: '',
        price: '',
        date: '',
        description: '',
        sales: []
    });
    const {id} = useParams();
    const [errors, setErrors] = useState([]);
    const [foundErrors, setFoundErrors] = useState(false);
    const [validateErrors, setValidateErrors] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:8000/productos/" + id, {withCredentials: true})
            .then((response) => {
                setProduct(response.data.product);
                //console.log(response.data.product)
            })
            .catch((error) => {
                console.log(error)
            })
    }, [id])

    const updateAProduct = async(product) => {
        await axios.put("http://localhost:8000/productos/" + id, product, {withCredentials: true})
            .then((response) => {
                setFoundErrors(false);
                //console.log(response)
                goToInventory();
            })
            .catch((error) => {
                setFoundErrors(true);
                console.log(error.response.data.error)
                if (error.response.data.error === "Token hasn't been sent") {
                    setErrors(["You are unauthorized to do this"]);
                }
                else {
                    const errorResponse = error.response.data.error.errors;
                    const errorArray = [];
                    for (const key of Object.keys(errorResponse)) {
                        errorArray.push(errorResponse[key].message)
                    }
                    setErrors(errorArray);
                }
                console.log(error)
            })
    }

    const handleInputChange = (event) => {
        setProduct({
            ...product,
            [event.target.name]: event.target.value
        })
    }

    const validate = () => {
        let flag = true;
        let error = {};

        if (product.name.length < 3){
            error.name = "El nombre del producto debe tener 3 letras como mínimo";
            flag = false;
        }

        if (product.quantity < 1){
            error.quantity = "La cantidad debe ser 1 como mínimo";
            flag = false;
        }

        if (product.price < 500){
            error.price = "El precio mínimo debe ser de 500 guaraníes";
            flag = false;
        }
        if (product.date.length > 10){
            error.date = "La fecha puede tener 10 caracteres como máximo";
            flag = false;
        }
        if (product.description.length > 300){
            error.description = "La descripción no debe superar los 300 caracteres";
            flag = false;
        }

        setValidateErrors(error);
        console.log(error);
        return flag;
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!validate()){
            return
        }

        const updatedProduct = {...product};
        updateAProduct(updatedProduct);
    }

    const goToInventory = () => {
        navigate("/productos/");
    }

    const goToDetails = (id) => {
        navigate("/productos/" + id);
    }
    
    return(
        <div className="edit-body">
            <div className="edit-header">
                <h1>Editar un Producto</h1>
                <button onClick={(event) => goToInventory()}>Regresar al Inventario</button>
            </div>
            <form className="edit-form" onSubmit={(event) => {handleSubmit(event)}}>
                <div className="edit-form-row">
                    <h4>Nombre del Producto:</h4>
                    <input
                        type="text"
                        name="name"
                        value={product.name}
                        placeholder="Nombre del Producto"
                        onChange={handleInputChange}
                    />
                </div>
                <div className="edit-form-row">
                    <h4>Cantidad:</h4>
                    <input
                        type="number"
                        name="quantity"
                        min="1"
                        step="1"
                        value={product.quantity}
                        placeholder="Cantidad"
                        onChange={handleInputChange}
                    />
                </div>
                <div className="edit-form-row">
                    <h4>Precio Unitario:</h4>
                    <input
                        type="number"
                        name="price"
                        min="500"
                        step="500"
                        value={product.price}
                        placeholder="Precio Unitario"
                        onChange={handleInputChange}
                    />
                </div>
                <div className="edit-form-row">
                    <h4>Fecha de Compra:</h4>
                    <input
                        type="date"
                        name="date"
                        value={product.date}
                        placeholder="Fecha de Compra"
                        onChange={handleInputChange}
                    />
                </div>
                <div className="edit-form-row">              
                    <h4>Descripción:</h4>
                    <textarea
                        type="text"
                        name="description"
                        cols="50"
                        rows="10"
                        value={product.description}
                        placeholder="Descripción del Producto"
                        onChange={handleInputChange}
                    ></textarea>
                </div>
                <div className='edit-errors'>
                    {/* Validaciones del front-end*/}
                    {foundErrors && errors.map((err, index) =>
                        <p className='name-error' key={index}>*{err}</p>
                    )}
                    {/* Validaciones del back-end */}
                    {validateErrors.name && <p>*{validateErrors.name}</p>}
                    {validateErrors.quantity && <p>*{validateErrors.quantity}</p>}
                    {validateErrors.price && <p>*{validateErrors.price}</p>}
                    {validateErrors.date && <p>*{validateErrors.date}</p>}
                    {validateErrors.description && <p>*{validateErrors.description}</p>}
                </div>
                <div className="edit-submit-div">
                    <button className="edit-submit-btn" type="submit">Aceptar</button>
                    <button onClick={(event) => {goToDetails(product._id)}} className="edit-cancel-btn">Cancel</button>
                </div>
            </form>
        </div>
    );
}

export default EditProduct;