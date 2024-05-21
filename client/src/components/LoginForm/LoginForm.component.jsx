import { useState } from "react";
import HTTPClient from "../../utils/HTTPClient.util";
import { useNavigate } from "react-router-dom";
import './LoginForm.style.css';

const LoginForm = (props) => {
    //errors : {name: message} donde name es el nombre de la key y message el value
    const [validateErrors, setValidateErrors] = useState({})
    const [incorrectData, setIncorrectData] = useState("");
    const [foundErrors, setFoundErrors] = useState(false);
    const [data, setData] = useState({});
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
        let error = {};

        if (data.username.length <= 4){
            error.username = "The username must be at least 5 characters long"
            flag = false;
        }

        if (data.password.length <= 7){
            error.password = "The password must be at least 8 characters long"
            flag = false;
        }

        setValidateErrors(error);
        console.log(error);
        return flag
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!validate()){
            return
        }

        let client = new HTTPClient();

        client.login(data.username, data.password)
            .then((response) => {
                //console.log(response.data.user.name)
                localStorage.setItem("username", response.data.user.name);
                setFoundErrors(false);
                navigate("/productos/");
            })
            .catch((error) => {
                //Validaciones del back-end
                setFoundErrors(true);
                setIncorrectData("The username or password you entered is incorrect");
                console.log(error.response.data.error)
            })
    }

    return(
        <div className="login-form">
            <form onSubmit={handleSubmit}>
            <h1>Login</h1>
                <div className="login-row">
                    <div className="login-col1">
                        <label htmlFor="username">Username</label>
                        <label htmlFor="password">Password</label>
                    </div>
                    <div className="login-col2">
                        <input 
                            id="userNameLogin"
                            type="text" 
                            name="username" 
                            value={data.username || ""} 
                            onChange={handleChange}
                            required={true}
                        />
                        <input
                        id="passwordLogin"
                        type="password" 
                        name="password" 
                        value={data.password || ""} 
                        onChange={handleChange}
                        required={true}
                        //minLength={8}
                    />
                    </div>
                </div>
                <div>
                    <button className="login-btn" type="submit">Log In</button>
                </div>
            </form>
            <div className="errors">
                {/* Validaciones del front-end */}
                {validateErrors.username && <p>*{validateErrors.username}</p>}
                {validateErrors.password && <p>*{validateErrors.password}</p>}
                {/* Validaciones del back-end */}
                {foundErrors && <p>*{incorrectData}</p>}
            </div>
        </div>
    );
}

export default LoginForm;