import React from 'react';
import Sidebar from '../../components/Sidebar/Sidebar.component';
import SoldProducts from '../../components/SoldProducts/SoldProducts.component';
import './SoldPage.style.css';

const SoldPage = () => {

    return(
        <div className='sold-page-body'>
            <div className='sidebar-part-sold'>
                <Sidebar
                    section='ventas'
                />
            </div>
            <div className='page-part-sold'>
                <SoldProducts/>
            </div>
        </div>
    );
}

export default SoldPage;