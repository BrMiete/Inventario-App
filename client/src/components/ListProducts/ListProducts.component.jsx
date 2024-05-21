import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ListProducts.style.css';

const ListProducts = () => {
    const [products, setProducts] = useState([]);
    const sortedProducts = products.sort((a, b) => 
        a.name.localeCompare(b.name));
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:8000/productos/", {withCredentials: true})
            .then((response) => {
                //console.log(response.data.products)
                setProducts(response.data.products);
            })
            .catch((error) => {
                console.log(error);
                if (error.response.data.error === "Token hasn't been sent") {
                    setErrors(["You are unauthorized to see this"]);
                }
            })
    }, [])

    const goToCreate = () => {
        navigate("/productos/nuevo");
    }

    const goToDetails = (id) => {
        navigate("/productos/" + id);
    }

    const goToSale = (id) => {
        navigate("/productos/vender/" + id);
    }

    const formatNumber = (price) => {
        return price.toLocaleString('es-AR', {
            // style: 'currency',
            // currency: 'PYG'
        })
    } 

    return(
        <div className='inventory-body'>
            <div className='inventory-header'>
                <h1>Inventario de Productos</h1>
                <button onClick={(event) => goToCreate()}>Agregar un Producto</button>
            </div>
            <div className='inventory-table'>
                <table>
                    <caption>Productos 2024</caption>
                    <thead>
                        <tr>
                            <th>Ítem</th>
                            <th>Producto</th>
                            <th>Cantidad</th>
                            <th>Precio Unitario Gs.</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedProducts.map((producto, index) => 
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{producto.name}</td>
                                <td>{producto.quantity}</td>
                                <td>{formatNumber(producto.price)}</td>
                                <td>{producto.quantity === 0 ? 
                                    <p style={{color: "red"}}>Fuera de Stock</p> : 
                                    <p style={{color: "green"}}>En Stock</p>
                                }</td>
                                <td>
                                    <button onClick={(event) => {goToDetails(producto._id)}}>Detalles</button>
                                    <button id="inventory-vender-btn" onClick={(event) => {goToSale(producto._id)}}>Vender</button>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <div className="list-errors">
                    {errors && errors.map((err, index) =>
                        <p key={index}>*{err}</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ListProducts;