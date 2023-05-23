import logo from "../../Assets/images/logo.svg";
import React, { useContext, useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext, UserContext } from "../../Context";
import { Button, Form } from "../../Components";
const Register = () => {
    const navigate = useNavigate();
    const {email, setEmail, password, setPassword } = useContext(AuthContext);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const signUp = (e) => {
        e.preventDefault();
        if(email === '' || password === ''){
            setError("Email and Password is required");
        } else {
            console.log(email, password);
            setSuccess('Login successful');
            navigate('/dashboard');
        }
    }

    return(
        <div className="flex-center">
            <img src={logo} alt="Todo Logo" width={150} />
            
            {error.length > 0 ?
                <div>{error}</div>
            : null }
            {success.length > 0 ?
                <div>{success}</div>
            : null }
            <Form.Container>
                <h1>Create Account</h1>
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
                <Form.Input
                type="password" 
                name="password" 
                placeholder="Re-type Password" 
                handleChange={(e) =>  setPassword(e.target.value)}
                req={true} 
                />
                <Button type="submit" onClick={signUp} label={'Create Account'} />
                <div className="flex-between mt-10">
                <Link to={"/"} className="link">Back</Link>
                <Link to={"/login"} className="link">Login</Link>
                </div>
                
            </Form.Container>
            
        </div>
    )
}

export default Register;