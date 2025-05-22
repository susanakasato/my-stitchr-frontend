import type { MouseEventHandler, ReactNode } from "react";
import "./Modal.css";
import Button from "./Button";

const Modal: React.FC<{
    id: string,
    title: string,
    children?: ReactNode,
    closeModalHandler: MouseEventHandler<HTMLButtonElement>
}> = (props) => {
    return <div className="modal" id={props.id}>
        <div className="modal-container">
            <h1>{props.title}</h1>
            <div className="modal-content-container">
                {props.children}
            </div>
            <Button color="blue" onClick={props.closeModalHandler} size="small">OK</Button>
        </div>
    </div>
}

export default Modal;