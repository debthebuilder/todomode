import "../../Assets/Styles/Form.css";

export const Form = {
    Container: ({children}) => {
        return(
            <form className="form">
                {children}
            </form>
        )
    },
    Input: ({type, name, placeholder, handleChange, req}) => {
        return(
            <input 
            type={type} 
            name={name} 
            placeholder={placeholder} 
            onChange={handleChange}
            required={req} 
            className="input"
            />
        )
        
    }
}