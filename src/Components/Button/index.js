import "../../Assets/Styles/Button.css";

export const Button = ({label, type, handleClick}) => {
    return(
        <button type={type} onClick={handleClick} className="button">
            {label}
        </button>
    )
}