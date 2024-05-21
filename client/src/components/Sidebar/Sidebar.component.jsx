import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LogoutButton from '../LogoutButton/LogoutButton.component';
import './Sidebar.style.css';

const Sidebar = ({section}) => {
    const [activeItem, setActiveItem] = useState(0);
    const navigate = useNavigate();

    const sidebarItems = [
        {
            name: 'Inventario',
            to: '/productos/',
            section: 'inventario'
        },
        {
            name: 'Detalles del Producto',
            to: '/productos/',
            section: 'detalles'
        },
        {
            name: 'Agregar un Producto',
            to: '/productos/nuevo',
            section: 'nuevo'
        },
        {
            name: 'Historial de Ventas',
            to: '/productos/ventas',
            section: 'ventas'
        },
    ]

    useEffect(() => {
        setActiveItem(sidebarItems.findIndex((e) => e.section === section));
    }, [section])

    return(
        <div className='sidebar-body'>
            <div className='sidebar-user'>
                <p>!Bienvenido {localStorage.getItem("username")}!</p>
            </div>
            <div className='sidebar-links'>
                {sidebarItems.map((item, index) => 
                    <span onClick={(event) => {navigate(item.to)}} className={activeItem === index ? 'selected-btn' : ''} key={index}><Link to={item.to}>{item.name}</Link></span>
                )}
            </div>
            <LogoutButton/>
        </div>
    );
}

export default Sidebar;