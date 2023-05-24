import "../../Assets/Styles/Form.css";

export const Form = {
    Container: ({children}) => {
        return(
            <form className="form">
                {children}
            </form>
        )
    },
    Label: ({labelFor, title}) => {
        return(
            <label htmlFor={labelFor} className="label">{title}</label>
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
        
    },
    Select: ({children}) => {
        return(
            <select className="input">
                {children}
            </select>
        )
    }
}