import logo from "../../Assets/images/logo.svg";
import React, { useContext, useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext, UserContext } from "../../Context";
import { Button, Form } from "../../Components";
const ResetPassword = () => {
    const navigate = useNavigate();
    const {email, password, setPassword } = useContext(AuthContext);
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const resetPassword = (e) => {
        e.preventDefault();
        if(password === '' || confirmPassword === ''){
            setError("Password is required");
        } else if (password !== confirmPassword){
            setError("Passwords do not match");
        }
         else {
            console.log(email, password);
            setSuccess('Password Changed successful');
            navigate('/login');
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
                <h1>Reset Password</h1>
                <Form.Input
                type="password" 
                name="password" 
                placeholder="Password" 
                handleChange={(e) =>  setPassword(e.target.value)}
                req={true} 
                />
                <Form.Input
                type="password" 
                name="reset-password" 
                placeholder="Retype Password" 
                handleChange={(e) =>  setConfirmPassword(e.target.value)}
                req={true} 
                />
                <Button type="submit" onClick={resetPassword} label={'Reset Password'} />
            </Form.Container>
            
        </div>
    )
}

export default ResetPassword;