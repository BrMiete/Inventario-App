import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import moment from 'moment';
import './SaleProduct.style.css';

const SaleProduct = () => {
    const {id} = useParams();
    const [product, setProduct] = useState({});
    const [newSale, setNewSale] = useState({
        soldQuantity: '',
        soldDate: '',
        totalCost: ''
    });
    const [errors, setErrors] = useState([]);
    const [foundErrors, setFoundErrors] = useState(false);
    const [validateErrors, setValidateErrors] = useState({});
    const navigate = useNavigate();
    const [price, setPrice] = useState("");
    const [totalPrice, setTotalPrice] = useState("");
    const today = new Date();

    useEffect(() => {
        axios.get("http://localhost:8000/productos/" + id, {withCredentials: true})
            .then((response) => {
                //console.log(response.data.product)
                setProduct(response.data.product);
                setPrice(response.data.product.price.toLocaleString('es-AR').toString());
                setTotalPrice((response.data.product.price*response.data.product.quantity).toLocaleString('es-AR').toString());
            })
            .catch((error) => { 
                console.log(error)
            })
    }, [id])

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setNewSale({ ...newSale, [name]: value });
    };

    const updateAProduct = async(soldProduct) => {
        await axios.put("http://localhost:8000/productos/" + id, soldProduct, {withCredentials: true})
            .then((response) => {
                setFoundErrors(false);
                //console.log(response)
                goToInventory();
            })
            .catch((error) => {
                setFoundErrors(true);
                //console.log(error.response.data.error)
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
    
    const goToInventory = () => {
        navigate("/productos/");
    }

    const productAvailability = () => {
        const cant = product.quantity;
        if (cant === 0) {
            return(
                <p style={{color: "red"}}>Fuera de Stock</p>
            );
        }
        else {
            return(
                <p style={{color: "green"}}>En Stock</p>
            );
        }
    }

    const validate = () => {
        let flag = true;
        let error = {};

        if (newSale.soldQuantity > product.quantity){
            error.soldQuantity = "La cantidad a vender no puede superar a la cantidad en stock";
            flag = false;
        }

        if (newSale.soldQuantity < 1){
            error.soldQuantity = "La cantidad debe ser 1 como mínimo";
                flag = false;
        }

        if (newSale.soldDate < today ){
            error.soldDate = "La fecha no puede ser posterior a hoy";
            flag = false;
        }

        setValidateErrors(error);
        //console.log(error);
        return flag;
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        if (!validate()){
            return
        }

        const totalCostValue = product.price * newSale.soldQuantity;
        const newTotalCost = totalCostValue.toLocaleString('es-AR').toString();
        console.log(newTotalCost)

        const updatedNewSale = {...newSale, totalCost: newTotalCost};
        console.log(updatedNewSale)
        
        const newQuantity = product.quantity - newSale.soldQuantity;
        //console.log(newQuantity)
        
        const updatedProduct = {...product, quantity: newQuantity, sales: [...product.sales, updatedNewSale]};
        //console.log(product)
        //console.log(newSale)
        console.log(updatedProduct)
        updateAProduct(updatedProduct);
    }

    return(
        <div className='sale-body'>
            <div className='sale-header'>
                <h1>Vender un Producto</h1>
                <button onClick={(event) => goToInventory()}>Regresar al Inventario</button>
            </div>
            <div className='sale-table'>
                <table>
                    <caption>Productos 2024</caption>
                    <thead>
                        <tr>
                            <th>Producto</th>
                            <th>Cantidad</th>
                            <th>Precio Unitario Gs.</th>
                            <th>Precio Total Gs.</th>
                            <th>Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{product.name}</td>
                            <td>{product.quantity}</td>
                            <td>{price}</td>
                            {/* <td>{product.quantity * product.price}</td> */}
                            <td>{totalPrice}</td>
                            {/* <td>{product.quantity === 0 ? "Fuera de Stock" : "En Stock"}</td> */}
                            <td>{productAvailability()}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <form className='sale-form' onSubmit={handleSubmit}>
                <div className='sale-row'>
                    <div className='sale-col1'>
                        <h4>Fecha de Compra:</h4>
                        <h4>Descripción:</h4>
                        <h4>Cantidad a Vender:</h4>
                        <h4>Fecha de Venta:</h4>
                    </div>
                    <div className='sale-col2'>
                        <p id='sale-date'>{moment(product.date).format("DD/MM/YYYY")}</p>
                        <p id='sale-description'>{product.description}</p>
                        <input
                            id='input-soldQuantity'
                            type="number"
                            name="soldQuantity"
                            min="1"
                            max={product.quantity}
                            step="1"
                            value={newSale.soldQuantity}
                            placeholder="Cantidad"
                            onChange={handleInputChange}
                        /><br/>
                        <input
                            type="date"
                            name="soldDate"
                            value={newSale.soldDate}
                            placeholder="Fecha de Venta"
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
                <div className='sale-errors'>
                    {/* Validaciones del front-end*/}
                    {foundErrors && errors.map((err, index) =>
                        <p className='name-error' key={index}>*{err}</p>
                    )}
                    {/* Validaciones del back-end */}
                    {validateErrors.soldQuantity && <p>*{validateErrors.soldQuantity}</p>}
                    {validateErrors.soldDate && <p>*{validateErrors.soldDate}</p>}
                </div>
                <div className='sale-buttons'>
                    <button type='submit' onClick={(event) => {handleSubmit(event)}}>Vender</button>
                    <button onClick={(event) => {goToInventory()}}>Cancelar</button>
                </div>
            </form>
        </div>
    );
}

export default SaleProduct;