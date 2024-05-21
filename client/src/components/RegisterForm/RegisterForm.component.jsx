import { useState} from 'react';
import HTTPClient from '../../utils/HTTPClient.util';
import { useNavigate } from 'react-router-dom';
import './RegisterForm.style.css';

const RegisterForm = (props) => {
    const [data, setData] = useState({});
    const [validateErrors, setValidateErrors] = useState({});
    const [foundErrors, setFoundErrors] = useState(false);
    const [emailError, setEmailError] = useState("");
    const navigate = useNavigate();

    const handleChange = (event) => {
        setData({
            ...data,
            [event.target.name]: event.target.value
        })
    }

    //Validaciones del front-end
    const validate = () => {
        let flag = true;
        let error = {}

        if (data.username.length <= 4){
            error.username = "The username must be at least 5 characters long"
            flag = false;
        }

        if (data.password.length <= 7){
            error.password = "The password must be at least 8 characters long"
            flag = false;
        }

        if (data.password && data.password2 && data.password !== data.password2){
            error.password2 = "Passwords must match"
            flag = false;
        }

        setValidateErrors(error);
        console.log(error);
        //console.log(data)
        return flag
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        if (!validate()){
            return
        }

        let client = new HTTPClient();

        client.register(data)
            .then((response) => {
                //TODO
                navigate("/login");
            })
            .catch((error) => {
                //Validaciones del back-end
                setFoundErrors(true);
                setEmailError("The email already exists");
                console.log(error)
            })
    }
    
    return(
        <div className='register-form'>
            <form onSubmit={handleSubmit}>
            <h1>Register</h1>
            <div className='register-row'>
                <div className='register-col1'>
                    <label htmlFor="username">Username</label>
                    <label htmlFor="password">Password</label>
                    <label htmlFor="password2">Confirm Password</label>
                </div>
                <div className='register-col2'>
                    <input
                        id="username"
                        type="text" 
                        name="username" 
                        value={data.username || ""} 
                        onChange={(event) => handleChange(event)}
                        required={true}
                    />
                    <input
                        id="password"
                        type="password" 
                        name="password" 
                        value={data.password || ""} 
                        onChange={handleChange}
                        required={true}
                        //minLength={8}
                    />
                    <input
                        id="password2"
                        type="password" 
                        name="password2" 
                        value={data.password2 || ""} 
                        onChange={handleChange}
                        required={true}
                        //minLength={8}
                    />
                </div>
            </div>
                <div>
                    <button type="submit">Submit</button>
                </div>
            </form>
            <div className='errors'>
                {/* Validaciones del front-end */}
                {validateErrors.username && <p>*{validateErrors.username}</p>}
                {validateErrors.password && <p>*{validateErrors.password}</p>}
                {validateErrors.password2 && <p>*{validateErrors.password2}</p>}
                {/* Validaciones del back-end */}
                {foundErrors && <p>*{emailError}</p>}
            </div>
        </div>
    );
}

export default RegisterForm;