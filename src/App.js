import logo from './Assets/images/logo.svg';
import './App.css';
import { ThemeContext } from "./Context";
import { useContext } from 'react';
import { Link } from 'react-router-dom';

function App() {
  const { darkMode, toggleMode } = useContext(ThemeContext);
  console.log(darkMode);
  
  return (
      <div className="flex-center">
          <img src={logo} alt="Todo Logo" width={150} />
              <h1>Welcome</h1>
             <p></p>
              
              <div className="flex-between mt-10">
              <Link to={"/register"} className="link button">Sign Up</Link>
              <Link to={"/login"} className="link button ml-10">Sign In</Link>
              </div>   
      </div>
  
  );
}

export default App;
