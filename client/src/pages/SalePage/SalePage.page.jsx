import React from 'react';
import Sidebar from '../../components/Sidebar/Sidebar.component';
import SaleProduct from '../../components/SaleProduct/SaleProduct.component';
import './SalePage.style.css';

const SalePage = () => {

    return(
        <div className='sale-page-body'>
            <div className='sidebar-part-sale'>
                <Sidebar
                    section='detalles'
                />
            </div>
            <div className='page-part-sale'>
                <SaleProduct/>
            </div>
        </div>
    );
}

export default SalePage;