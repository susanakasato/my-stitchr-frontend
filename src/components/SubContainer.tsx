import type { ReactNode } from "react";
import "./SubContainer.css";

function SubContainer(props: {children?: ReactNode}) {
    return <div className="sub-container">
        {props.children}
    </div>
}

export default SubContainer;