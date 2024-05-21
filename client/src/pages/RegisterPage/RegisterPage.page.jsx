import { Link } from 'react-router-dom';
import RegisterForm from '../../components/RegisterForm/RegisterForm.component';
import './RegisterPage.style.css';

const RegisterPage = () => {
    return(
        <div className='register-page'>
            <RegisterForm/>
            <p>Back to <Link to={'/login'}>Login</Link></p>
        </div>
    );
}

export default RegisterPage;