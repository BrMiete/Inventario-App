import React from 'react';
import Sidebar from '../../components/Sidebar/Sidebar.component';
import EditProduct from '../../components/EditProduct/EditProduct.component';
import './EditPage.style.css';

const EditPage = () => {
    return(
        <div className='edit-page-body'>
            <div className='sidebar-part-edit'>
                <Sidebar
                    section='detalles'
                />
            </div>
            <div className='page-part-edit'>
                <EditProduct/>
            </div>
        </div>
    );
}

export default EditPage;