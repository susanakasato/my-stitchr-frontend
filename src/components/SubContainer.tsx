import type { ReactNode } from "react";
import "./SubContainer.css";

const SubContainer: React.FC<{
    children: ReactNode
}> = (props) => {
    return <div className="sub-container">
        {props.children}
    </div>
}

export default SubContainer;