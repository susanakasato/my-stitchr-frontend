import NavigationButton from "../components/NavigationButton";
import "./CutImage.css";
import BackIcon from "@mui/icons-material/ArrowBack";
import SizeContainer from "../components/SizeContainer";
import SubContainer from "../components/SubContainer";
import Button from "../components/Button";
import { useImage } from "../contexts/ImageContext";
import { useEffect, useState, type ChangeEvent, type ChangeEventHandler } from "react";
import ReactCrop, { type Crop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { getCroppedBlob } from "../Utils";
import UploadInput from "../components/UploadInput";
import CheckIcon from "@mui/icons-material/Check";

const CutImage: React.FC = () => {
    const imageContext = useImage();
    const [imageSrc, setImageSrc] = useState("");
    const [crop, setCrop] = useState<Crop>({
        unit: "%",
        x: 0,
        y: 0,
        width: 100,
        height: 100
    });
    const [imageSize, setImageSize] = useState({
        width: 0,
        height: 0
    })
    const [canvasImage, setCanvasImage] = useState<HTMLImageElement>();

    useEffect(() => {
        if (imageContext.image.size > 0) {
            setImageSrc(URL.createObjectURL(imageContext.image));
        }
    }, [imageContext.image]);

    useEffect(() => {
        if (canvasImage) {
            let newWidth;
            let newHeight;
            if (crop.unit == "%") {
                newWidth = Math.round(canvasImage.naturalWidth * crop.width / 100 * 10) / 10;
                newHeight = Math.round(canvasImage.naturalHeight * crop.height / 100 * 10) / 10;
            } else {
                newWidth = Math.round(crop.width / canvasImage.width * canvasImage.naturalWidth * 10) / 10;
                newHeight = Math.round(crop.height / canvasImage.height * canvasImage.naturalHeight * 10) / 10;
            }
            setImageSize({width: newWidth, height: newHeight});
        }
    }, [crop, canvasImage]);

    const onLoadCanvasImage = (e: React.SyntheticEvent<HTMLImageElement>) => {
        setCanvasImage(e.currentTarget);
    }

    const onClickSaveButton = async () => {
        let blob;
        if (canvasImage) blob = await getCroppedBlob(canvasImage, crop);
        imageContext.setImage(blob);
    }

    const onChangeWidthImage: ChangeEventHandler<HTMLInputElement> = (e: ChangeEvent<HTMLInputElement>) => {
        if (canvasImage) {
            let newCropWidth;
            let maxCropWidth;
            if (crop.unit == "%") {
                maxCropWidth = (canvasImage.width - crop.x) / canvasImage.width * 100;
                newCropWidth = Number(e.target.value) / canvasImage.naturalWidth * 100
            } else {
                maxCropWidth = canvasImage.width - crop.x;
                newCropWidth = Number(e.target.value) / canvasImage.naturalWidth * canvasImage.width
            }
            setCrop({
                ...crop, 
                width: newCropWidth > maxCropWidth ? maxCropWidth : newCropWidth
            });
        }
    }

    const onChangeHeightImage: ChangeEventHandler<HTMLInputElement> = (e: ChangeEvent<HTMLInputElement>) => {
        if (canvasImage) {
            let maxCropHeight;
            let newCropHeight;
            if (crop.unit == "%") {
                maxCropHeight = (canvasImage.height - crop.y) / canvasImage.height * 100;
                newCropHeight = Number(e.target.value) / canvasImage.naturalHeight * 100;
            } else {
                maxCropHeight = canvasImage.height - crop.y;
                newCropHeight = Number(e.target.value) / canvasImage.naturalHeight * canvasImage.height;
            }
            setCrop({
                ...crop,
                height: newCropHeight > maxCropHeight ? maxCropHeight : newCropHeight
            })
        }
    }

    return <>
        <NavigationButton onClick={() => { }} side="left" to="/">
            <div className="back-button-container">
                <BackIcon fontSize="medium" />
                <span className="back-button-label">BACK</span>
            </div>
        </NavigationButton>
        <h1>Let's cut your image, for better fit to the cross stitch!</h1>
        {imageSrc ? 
            <>
                <div id="image-container">
                    <div className="react-crop-wrapper">
                        <ReactCrop
                            crop={crop}
                            onChange={c => setCrop(c)}
                            className="crop-image"
                        >
                            <img className="crop-image"
                                src={imageSrc}
                                onLoad={(e: React.SyntheticEvent<HTMLImageElement, Event>) => onLoadCanvasImage(e)}
                            />
                        </ReactCrop>
                    </div>
                </div>
                <SubContainer>
                    <h2>Cropped image size (pixels):</h2>
                    <SizeContainer 
                        width={{
                            value: imageSize.width,
                            onChange: onChangeWidthImage}} 
                        height={{
                            value: imageSize.height,
                            onChange: onChangeHeightImage}}
                    />
                </SubContainer>
                <Button color="blue" to="/" onClick={onClickSaveButton}>
                    <CheckIcon className="icons" fontSize="small"/>
                    <span>SAVE CHANGES</span>
                </Button>
            </>
        :
            <UploadInput size="big"/>
        }
    </>
}

export default CutImage;