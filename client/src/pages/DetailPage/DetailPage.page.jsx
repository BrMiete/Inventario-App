import React from 'react';
import Sidebar from '../../components/Sidebar/Sidebar.component';
import DetailProduct from '../../components/DetailProduct/DetailProduct.component';
import './DetailPage.style.css';

const DetailPage = () => {

    return(
        <div className='detail-page-body'>
            <div className='sidebar-part-detail'>
                <Sidebar
                    section='detalles'
                />
            </div>
            <div className='page-part-detail'>
                <DetailProduct/>
            </div>
        </div>
    );
}

export default DetailPage;