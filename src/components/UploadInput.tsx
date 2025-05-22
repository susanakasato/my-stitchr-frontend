import "./UploadInput.css";
import "./Button.css";
import { type ChangeEvent, type ChangeEventHandler } from "react";
import { useImage } from "../contexts/ImageContext";
import UploadIcon from "@mui/icons-material/Upload";


const UploadInput: React.FC<{
    size: "small" | "big"
}> = (props) => {
    const imageContext = useImage();

    const handleFileChange: ChangeEventHandler<HTMLInputElement> = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            imageContext.setImage(files[0]);
            imageContext.setOriginalImage(files[0]);
        }
    }

    return <>
        <input type="file" id="image-upload" accept="image/*" className="image-input" onChange={handleFileChange}/>
        <label htmlFor="image-upload" className={`image-input-label button grey ${props.size}`}>
            <UploadIcon fontSize="small" className="icons"/> 
            <span>UPLOAD PICTURE</span>
        </label>
    </>
}

export default UploadInput;