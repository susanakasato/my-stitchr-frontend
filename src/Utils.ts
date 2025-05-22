import type { Crop } from "react-image-crop";

export const getImageSize = async (blob: Blob): Promise<{
    width: number,
    height: number
}> => {
    const bitmap = await createImageBitmap(blob);
    return {
        width: bitmap.width,
        height: bitmap.height
    }
}

export const getCroppedBlob = (image: HTMLImageElement, crop: Crop): Promise<Blob> => {
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const finalWidth = (crop.unit == "%" ? image.width : 1) * crop.width * scaleX;
    const finalHeight = (crop.unit == "%" ? image.height : 1) * crop.height * scaleY;
    const canvas = document.createElement("canvas");
    canvas.width = finalWidth;
    canvas.height = finalHeight;
    const ctx = canvas.getContext("2d");
    ctx?.drawImage(
        image,
        crop.x * scaleX,
        crop.y * scaleY,
        finalWidth,
        finalHeight,
        0,
        0,
        finalWidth,
        finalHeight
    );

    return new Promise(resolve => {
        canvas.toBlob((blob) => {
            if (blob) resolve(blob);
        });
    })
}