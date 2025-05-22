import type { MouseEventHandler, ReactNode } from "react";
import "./NavigationButton.css";
import { Link } from "react-router-dom";

const NavigationButton: React.FC<{
    children: ReactNode | string,
    onClick: MouseEventHandler<HTMLButtonElement>,
    side: "left" | "right",
    to: string
}> = (props) => {
    return <Link to={props.to} className="navigation-button-link">
        <div className={"navigation-button-container button-" + props.side}>
                <button className="navigation-button" onClick={props.onClick}>
                {props.children}
            </button>
        </div>
    </Link>

}

export default NavigationButton;