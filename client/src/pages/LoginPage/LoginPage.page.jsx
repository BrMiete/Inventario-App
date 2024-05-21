// import { Link } from 'react-router-dom';
import LoginForm from '../../components/LoginForm/LoginForm.component';
import './LoginPage.style.css'

const LoginPage = (props) => {
    return(
        <div className='login-page'>
            <LoginForm/>
            {/* <p>Haven't an account yet? <Link to={"/register"}>Sign In</Link></p> */}
        </div>
    );
}

export default LoginPage;