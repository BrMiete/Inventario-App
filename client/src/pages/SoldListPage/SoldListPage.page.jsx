import React from 'react';
import Sidebar from '../../components/Sidebar/Sidebar.component';
import SoldList from '../../components/SoldList/SoldList.component';
import './SoldListPage.style.css';

const SoldListPage = () => {
    return(
        <div className='sold-list-page-body'>
            <div className='sidebar-part-sold-list'>
                <Sidebar
                    section='ventas'
                />
            </div>
            <div className='page-part-sold-list'>
                <SoldList/>
            </div>
        </div>
    );
}

export default SoldListPage;