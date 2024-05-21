import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import moment from 'moment';
import './SoldList.style.css';

const SoldList = () => {
    const {id} = useParams();
    const [product, setProduct] = useState({});
    const [sales, setSales] = useState([]);
    const [newSales, setNewSales] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:8000/productos/" + id, {withCredentials: true})
            .then((response) => {
                //console.log(response.data.product)
                setProduct(response.data.product);
                setSales(response.data.product.sales);
            })
            .catch((error) => { 
                console.log(error)
            })
    }, [id])

    const updateSales = (id) => {
        let newQuantity = 0;
        for (let i=0; i<sales.length; i++){
            if(sales[i]._id === id) {
                newQuantity = product.quantity + sales[i].soldQuantity;
            }
        }
        //console.log("Nueva cantidad: ", newQuantity)
        
        let j = 0;
        let array = [];
        for (let i=0; i<sales.length; i++){
            if(sales[i]._id !== id){
                array[j] = sales[i];
                j++
            }
        }
        setNewSales(newSales => [...newSales, ...array]);
        const updatedSales = [...newSales, ...array];
        //console.log("Sale Updated: ", updatedSales)
        
        const updatedProduct = {...product, quantity: newQuantity, sales: [...updatedSales]};
        //console.log("Product Updated: ", updatedProduct)
        updateAProduct(updatedProduct);
    }

    const updateAProduct = async(product) => {
        await axios.put("http://localhost:8000/productos/" + id, product, {withCredentials: true})
            .then((response) => {
                //console.log(response)
                goToInventory();
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const goToSales = () => {
        navigate("/productos/ventas/");
    }

    const goToInventory = () => {
        navigate("/productos/");
    }

    return(
        <div className='sold-list-body'>
            <div className='sold-list-header'>
                <h1>Detalles de las Ventas</h1>
                <button onClick={(event) => goToSales()}>Regresar al Historial de Ventas</button>
            </div>
            <div className='sold-list-table'>
                <div className='sold-list-product'>
                    <div className='sold-list-product-col1'>
                        <h3>Producto:</h3>
                    </div>
                    <div className='sold-list-product-col2'>
                        <h3>{product.name}</h3>
                    </div>
                </div>
                <table>
                    <caption>Productos 2024</caption>
                    <thead>
                        <tr>
                            <th>Venta N°</th>
                            <th>Cantidad Vendida</th>
                            <th>Precio Total Gs.</th>
                            <th>Fecha de Venta</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sales.map((venta, index) =>
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{venta.soldQuantity}</td>
                                <td>{venta.totalCost}</td>
                                <td>{moment(venta.soldDate).format("DD/MM/YYYY")}</td>
                                <td>
                                    <button onClick={(event) => {updateSales(venta._id)}}>Eliminar Venta</button>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
export default SoldList;