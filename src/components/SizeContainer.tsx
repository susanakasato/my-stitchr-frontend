import type { ChangeEventHandler } from "react";
import "./SizeContainer.css";
import NumberInput from "./NumberInput";

const SizeContainer: React.FC<{
    width: {
        value: number, 
        onChange: ChangeEventHandler<HTMLInputElement>
    }, 
    height: {
        value: number,
        onChange: ChangeEventHandler<HTMLInputElement>
    }
}> = (props) => {
    return <div className="size-container">
        <NumberInput 
            label="WIDTH" 
            value={props.width.value} 
            onChange={props.width.onChange} 
        />
        <span className="size-container-x">X</span>
        <NumberInput 
            label="HEIGHT" 
            value={props.height.value} 
            onChange={props.height.onChange} 
        />
    </div>
}

export default SizeContainer;