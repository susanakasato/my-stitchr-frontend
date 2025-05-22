import type { JSX, MouseEventHandler, ReactNode } from "react";
import "./Button.css";
import { Link } from "react-router-dom";

const Button: React.FC<{
    children: ReactNode | string, 
    onClick: MouseEventHandler<HTMLButtonElement>,
    color: "brown" | "orange" | "white" | "grey" | "green" | "blue",
    to?: string,
    size?: "small" | "big"
}> = (props) => {

    const buttonHtml: JSX.Element = <button className={`button ${props.color} ${props.size || "big"}`} onClick={props.onClick}>
            {props.children}
        </button>;

    return <>
        {props.to ? 
            <Link to={props.to} className="button-link">
                {buttonHtml}
            </Link> :
            <>{buttonHtml}</>
        }
    </>
}

export default Button;