import "./Home.css";
import { PatternService } from "../services/PatternService";
import Button from "../components/Button";
import SizeContainer from "../components/SizeContainer";
import SubContainer from "../components/SubContainer";
import UploadInput from "../components/UploadInput";
import { useImage } from "../contexts/ImageContext";
import { useEffect, useState, type ChangeEvent, type ChangeEventHandler } from "react";
import LoadingCircle from "@mui/material/CircularProgress";
import CropIcon from "@mui/icons-material/Crop";
import ResetIcon from "@mui/icons-material/RestartAlt";
import EditIcon from "@mui/icons-material/Edit";
import DownloadIcon from "@mui/icons-material/Download";

const stitchMax = 1000;

function Home() {
    const imageContext = useImage();
    const [previewImage, setPreviewImage] = useState("");
    const [stitchCount, setStitchCount] = useState({
        width: 0,
        height: 0
    });
    const [stitchRatio, setStitchRatio] = useState(0);
    const [pdfUrl, setPdfUrl] = useState("");
    const [isGenerating, setIsGenerating] = useState(false);

    useEffect(() => {
        if (imageContext.image.size == 0) {
            setPreviewImage("");
            return;
        } else {
            setPreviewImage(URL.createObjectURL(imageContext.image));
            createImageBitmap(imageContext.image).then(imageBitmap => {
                setStitchCount({
                    width: imageBitmap.width,
                    height: imageBitmap.height
                });
                setStitchRatio(imageBitmap.width / imageBitmap.height);
            });
        }
    }, [imageContext.image]);

    const onClickResetImage = () => {
        imageContext.setImage(imageContext.originalImage);
    }

    const onChangeWidthStitchCount: ChangeEventHandler<HTMLInputElement> = (e: ChangeEvent<HTMLInputElement>) => {
        const newWidth: number = Number(e.target.value);
        if (newWidth > stitchMax) return;
        setStitchCount({
            ...stitchCount,
            width: newWidth,
            height: Math.round(newWidth / stitchRatio)
        });
    }

    const onChangeHeightStitchCount: ChangeEventHandler<HTMLInputElement> = (e: ChangeEvent<HTMLInputElement>) => {
        const newHeight: number = Number(e.target.value);
        if (newHeight > stitchMax) return;
        setStitchCount({
            ...stitchCount,
            width: Math.round(newHeight * stitchRatio),
            height: newHeight
        });
    }

    const onClickGeneratePattern = async () => {
        setIsGenerating(true);
        setPdfUrl("");
        const pdfBlob: Blob = await PatternService.generatePatterm(imageContext.image, {width: stitchCount.width, height: stitchCount.height});
        setPdfUrl(URL.createObjectURL(pdfBlob));
        setIsGenerating(false);
    }

    const onClickDownload = () => {
        window.open(pdfUrl);
    }

    return <>
        <h1>Create your own and custom cross stitch pattern from pictures!</h1>
        <SubContainer>
            <div className="image-container">
                {!!previewImage && (
                    <div className="image-preview-container">
                        <img className="preview-image" src={previewImage}/>
                    </div>
                )}
                <div className={`image-buttons-container ${!previewImage && "single"}`}>
                    <UploadInput size={previewImage ? "small" : "big"}/>
                    {!!previewImage && (<>
                        <Button onClick={() => {}} color="grey" to="cut-image" size={previewImage ? "small" : "big"}>
                            <CropIcon className="icons" fontSize="small"/>
                            <span>CUT IMAGE</span> 
                        </Button>
                        <Button onClick={onClickResetImage} color="grey" size={previewImage ? "small" : "big"}>
                            <ResetIcon className="icons" fontSize="small"/>
                            <span>RESET IMAGE</span>
                        </Button>
                    </>)}
                </div>
            </div>
        </SubContainer>
        {!!previewImage && (<>
        <SubContainer>
            <h2>Cross stitch fabric count:</h2>
            <h3>Max: 1000</h3>
            <SizeContainer 
                width={{
                    value: stitchCount.width,
                    onChange: onChangeWidthStitchCount
                }} 
                height={{
                    value: stitchCount.height,
                    onChange: onChangeHeightStitchCount
                }}
            />
        </SubContainer>
        <Button onClick={onClickGeneratePattern} color="blue">
            <EditIcon className="icons" fontSize="small"/>
            <span>GENERATE PATTERN</span>
        </Button>
        {!!isGenerating && <div className="loading-circle-container">
            <LoadingCircle className="loading-circle" size="25px"/>
            </div>}
        {!!pdfUrl &&<Button onClick={onClickDownload} color="brown">
                <DownloadIcon className="icons" fontSize="small"/>
                <span>DOWNLOAD</span>
        </Button>}
        </>)}
    </>
}

export default Home;