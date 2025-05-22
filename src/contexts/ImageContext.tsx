import { createContext, useContext, useState } from "react";

const ImageContext = createContext<{
    originalImage: Blob,
    image: Blob,
    setImage: Function,
    setOriginalImage: Function
}>({
    originalImage: new Blob(),
    image: new Blob(),
    setImage: () => {},
    setOriginalImage: () => {}
});

export function ImageProvider(props: {children: any}) {
    const [image, setImageState] = useState<Blob>(new Blob());
    const [originalImage, setOriginalImageState] = useState<Blob>(new Blob());

    const setImage = (image: Blob) => {
        setImageState(image);
    }

    const setOriginalImage = (image: Blob) => {
        setOriginalImageState(image);
    }

    return <ImageContext.Provider value={{image, setImage, originalImage, setOriginalImage}}>
        {props.children}
    </ImageContext.Provider>
}

export function useImage() {
    return useContext(ImageContext);
}