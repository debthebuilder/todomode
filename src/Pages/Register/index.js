import logo from "../../Assets/images/logo.svg";
import React, { useContext, useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext, UserContext } from "../../Context";
import { Form } from "../../Components";
import { API } from "../../Middleware/api";
const Register = () => {
    const navigate = useNavigate();
    const {username, setUsername, email, setEmail, password, setPassword, setIsLoggedIn } = useContext(AuthContext);
    const {setUser} = useContext(UserContext);
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const signUp = (e) => {
        e.preventDefault();
        if(username=== '' || email === '' || password === ''){
            setError("All fields are required");
        } else if (password !== confirmPassword){
            setError("Passwords do not match");
        } else {
            console.log(username, email, password);
            const user = {username, email, password};
            
            API(`/user/register`, user, "POST")
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
                    setSuccess('Account Created successfully!');
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
            .catch(error => console.error(error));  
        }
    }

    return(
        <div className="flex-center">
            <img src={logo} alt="Todo Logo" width={150} />
            
            
            <Form.Container>
                <h1>Create Account</h1>
                {error.length > 0 ?
                <div style={{color: "red"}}>{error}</div>
            : null }
            {success.length > 0 ?
                <div style={{color: "green"}}>{success}</div>
            : null }
                <Form.Input
                type="text" 
                name="username" 
                value={username}
                placeholder="Your Name" 
                handleChange={(e) =>  setUsername(e.target.value)}
                req={true} 
                />
                <Form.Input
                type="email" 
                name="email"
                value={email} 
                placeholder="Your Email" 
                handleChange={(e) =>  setEmail(e.target.value)}
                req={true} 
                />
                <Form.Input
                type="password" 
                name="password" 
                value={password}
                placeholder="Your Password" 
                handleChange={(e) =>  setPassword(e.target.value)}
                req={true} 
                />
                <Form.Input
                type="password" 
                name="confirmPassword"
                value={confirmPassword} 
                placeholder="Re-type Password" 
                handleChange={(e) =>  setConfirmPassword(e.target.value)}
                req={true} 
                />
                <input type="submit" onClick={signUp} value={"Sign up"} />
                
                <div className="flex-between mt-10">
                <Link to={"/"} className="link">Back</Link>
                <Link to={"/login"} className="link">Login</Link>
                </div>
                
            </Form.Container>
            
        </div>
    )
}

export default Register;