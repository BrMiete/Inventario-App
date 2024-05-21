import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import './DetailProduct.style.css';

const DetailProduct = () => {
    const {id} = useParams();
    const [product, setProduct] = useState({});
    const navigate = useNavigate();
    const [price, setPrice] = useState("");
    const [totalPrice, setTotalPrice] = useState("");

    useEffect(() => {
        axios.get("http://localhost:8000/productos/" + id, {withCredentials: true})
            .then((response) => {
                //console.log(response.data.product)
                setProduct(response.data.product)
                setPrice(response.data.product.price.toLocaleString('es-AR').toString());
                setTotalPrice((response.data.product.price*response.data.product.quantity).toLocaleString('es-AR').toString());
            })
            .catch((error) => { 
                console.log(error)
            })
    }, [id])

    const deleteProduct = async(id) => {
        await axios.delete("http://localhost:8000/productos/eliminar/" + id, {withCredentials: true})
            .then((response) => {
                //console.log(response)
                goToInventory();
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const goToInventory = () => {
        navigate("/productos/");
    }

    const goToEdit = (id) => {
        navigate("/productos/" + id + "/editar");
    }

    const goToSale = (id) => {
        navigate("/productos/vender/" + id);
    }

    // const totalPrice = () => {
    //     const price = product.price;
    //     const quantity = product.quantity;
    //     let total = 0;
    //     if (quantity === 0){
    //         return "-"
    //     }
    //     else {
    //         total = price*quantity;
    //         return formatNumber(total).toString();
    //     }
    // }

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

    // const formatNumber = (value) => {
    //     return value.toLocaleString('es-AR').toString();
    // } 
    
    return(
        <div className='detail-body'>
            <div className='detail-header'>
                <h1>Detalle del Producto</h1>
                <button onClick={(event) => goToInventory()}>Regresar al Inventario</button>
            </div>
            <div className='detail-table'>
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
            <div className='detail-row'>
                <div className='detail-col1'>
                    <p>Fecha de Compra:</p>
                    <p>Descripción:</p>
                </div>
                <div className='detail-col2'>
                    <p>{moment(product.date).format("DD/MM/YYYY")}</p>
                    <p>{product.description}</p>
                </div>
            </div>
            <div className='detail-buttons'>
                <button onClick={(event) => {goToSale(id)}}>Vender</button>
                <button onClick={(event) => {goToEdit(product._id)}}>Editar</button>
                <button onClick={(event) => {deleteProduct(id)}}>Eliminar</button>
            </div>
        </div>
    );
}

export default DetailProduct;