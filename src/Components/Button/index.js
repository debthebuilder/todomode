import "../../Assets/Styles/Button.css";

export const Button = ({label, type}) => {
    return(
        <button type={type} className="button">
            {label}
        </button>
    )
}