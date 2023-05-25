import logo from "../../Assets/images/logo.svg";
import React, { useContext, useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext, UserContext } from "../../Context";
import { Button, Form } from "../../Components";
import { API } from "../../Middleware/api";
const Login = () => {
    const navigate = useNavigate();
    const {email, setEmail, password, setPassword, setIsLoggedIn } = useContext(AuthContext);
    const {setUser } = useContext(UserContext);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const signIn = (e) => {
        e.preventDefault();
        if(email === '' || password === ''){
            setError("Email and Password is required!");
        } else {
            const user = { email, password };
            
            API(`/user/login`, user, "POST")
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if(data.id) {
                    console.log(data);
                    setUser({
                        id: data.id,
                        username: data.username,
                        email: data.email
                    });
                    setIsLoggedIn(true);
                    setSuccess('Login successful');
                    setTimeout(() => {
                        navigate('/dashboard');
                    }, "3000")
                } else {
                    setError(data.message);
                    setTimeout(() => {
                        setError('');
                    }, "3000")
                }
            })
            .catch(error => {
                setError(error);
                console.error(error)
            });  
        }

    }

    return(
        <div className="flex-center">
            <img src={logo} alt="Todo Logo" width={150} />
            
            
            <Form.Container>
                <h1>Welcome Back</h1>
                {error.length > 0 ?
                <div>{error}</div>
            : null }
            {success.length > 0 ?
                <div>{success}</div>
            : null }
                <Form.Input
                type="email" 
                name="email" 
                placeholder="Your Email" 
                handleChange={(e) =>  setEmail(e.target.value)}
                req={true} 
                />
                <Form.Input
                type="password" 
                name="password" 
                placeholder="Your Password" 
                handleChange={(e) =>  setPassword(e.target.value)}
                req={true} 
                />
                <input type="submit" onClick={signIn} value={"Login"} />
                <div className="flex-between mt-10">
                <Link to={"/forgot-password"} className="link">Forgot Password</Link>
                <Link to={"/register"} className="link">New User</Link>
                </div>
                
            </Form.Container>
            
        </div>
    )
}

export default Login;