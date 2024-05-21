import React from 'react';
import Sidebar from '../../components/Sidebar/Sidebar.component';
import CreateProduct from '../../components/CreateProduct/CreateProduct.component';
import './CreatePage.style.css';

const CreatePage = () => {

    return(
        <div className='create-page-body'>
            <div className='sidebar-part-create'>
                <Sidebar
                    section='nuevo'
                />
            </div>
            <div className='page-part-create'>
                <CreateProduct/>
            </div>
        </div>
    );
}

export default CreatePage;