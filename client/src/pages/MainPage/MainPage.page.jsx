import React from "react";
import Sidebar from '../../components/Sidebar/Sidebar.component';
import ListProducts from '../../components/ListProducts/ListProducts.component';
import './MainPage.style.css';

const MainPage = () => {

    return(
        <div className="main-body">
            <div className="sidebar-part-main">
                <Sidebar
                    section='inventario'
                />
            </div>
            <div className="page-part-main">
                <ListProducts/>
            </div>
        </div>
    );
}

export default MainPage;