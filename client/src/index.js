import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import './index.css';
//import App from './App';
import reportWebVitals from './reportWebVitals';
import LoginPage from './pages/LoginPage/LoginPage.page';
import RegisterPage from './pages/RegisterPage/RegisterPage.page';
import MainPage from './pages/MainPage/MainPage.page';
import DetailPage from './pages/DetailPage/DetailPage.page';
import SalePage from './pages/SalePage/SalePage.page';
import EditPage from './pages/EditPage/EditPage.page';
import CreatePage from './pages/CreatePage/CreatePage.page';
import SoldPage from './pages/SoldPage/SoldPage.page';
import SoldListPage from './pages/SoldListPage/SoldListPage.page';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route index={true} path='/login' element={<LoginPage/>}/>
        <Route path='/register' element={<RegisterPage/>}/>
        <Route path='/productos/' element={<MainPage/>}/>
        <Route path='/productos/:id/editar' element={<EditPage/>}/>
        <Route path='/productos/:id' element={<DetailPage/>}/>
        <Route path='/productos/nuevo' element={<CreatePage/>}/>
        <Route path='/productos/vender/:id' element={<SalePage/>}/>
        <Route path='/productos/ventas/' element={<SoldPage/>}/>
        <Route path='/productos/ventas/:id' element={<SoldListPage/>}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
