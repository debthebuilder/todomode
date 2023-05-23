import logo from "../../Assets/images/logo.svg";
import React, { useContext, useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext, UserContext } from "../../Context";
import { Button, Form } from "../../Components";
const ResetPassword = () => {
    const navigate = useNavigate();
    const {email, setEmail, password, setPassword } = useContext(AuthContext);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const signIn = (e) => {
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
                <h1>Forgot Password</h1>
                <Form.Input
                type="email" 
                name="email" 
                placeholder="Enter Your Email" 
                handleChange={(e) =>  setEmail(e.target.value)}
                req={true} 
                />
                <Button type="submit" onClick={signIn} label={'Send Password Link'} />
                <div className="flex-between mt-10">
                <Link to={"/login"} className="link">Back</Link>
                <Link to={"/register"} className="link">New User</Link>
                </div>
                
            </Form.Container>
            
        </div>
    )
}

export default ResetPassword;