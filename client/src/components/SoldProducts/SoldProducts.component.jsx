import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './SoldProducts.style.css';

const SoldProducts = () => {
    const [products, setProducts] = useState([]);
    let sales = [];
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

    const searchSales = (products) => {
        for (let i=0; i<products.length; i++){
            if (products[i].sales.length !== 0){
                sales = [...sales, {id: products[i]._id, name: products[i].name, sales: products[i].sales.length}]
                //console.log(products[i]._id)
                //console.log(products[i].name)
                //console.log(products[i].sales.length)
            }
        }
        //console.log(sales)
    }
    searchSales(products);

    const goToSaleDetails = (id) => {
        navigate("/productos/ventas/" + id);
    }

    const goToInventory = () => {
        navigate("/productos/");
    }
    
    return(
        <div className='sold-body'>
            <div className='sold-header'>
                <h1>Historial de Ventas</h1>
                <button onClick={(event) => goToInventory()}>Regresar al Inventario</button>
            </div>
            <div>
                {sales.length !== 0 ?
                    (<div className='sold-table'>
                        <table>
                            <caption>Productos 2024</caption>
                            <thead>
                                <tr>
                                    <th>Ítem</th>
                                    <th>Producto</th>
                                    <th>Total de Ventas</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {sales.map((venta, index) =>
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{venta.name}</td>
                                        <td>{venta.sales}</td>
                                        <td>
                                            <button onClick={(event) => {goToSaleDetails(venta.id)}}>Detalles</button>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                        <div className="sold-errors">
                            {errors && errors.map((err, index) =>
                                <p key={index}>*{err}</p>
                            )}
                        </div>
                    </div>) : <h3 className='sold-message'>Aún no se han registrado ventas</h3>
                }
            </div>
        </div>
    );
}

export default SoldProducts;