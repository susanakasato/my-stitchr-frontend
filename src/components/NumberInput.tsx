import type { ChangeEvent, ChangeEventHandler } from "react";
import "./NumberInput.css";

function NumberInput(props: {
    label: string,
    value: number,
    onChange: ChangeEventHandler<HTMLInputElement>,
    max?: number
}) {
    return <div className="number-input-control">
        <input 
            className="number-input" 
            onChange={(e: ChangeEvent<HTMLInputElement>) => props.onChange(e)} 
            type="number"
            value={props.value}
            onWheel={e => e.currentTarget.blur()}/>
        <span className="number-input-label">{props.label}</span>
    </div>
}

export default NumberInput;