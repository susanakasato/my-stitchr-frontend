const generatePattern = async (image: Blob, size: {width: number, height: number}): Promise<Blob> => {
    const url = import.meta.env.VITE_API_URL + "/pattern";
    const formData = new FormData();
    formData.append("image", image);
    formData.append("width", size.width.toString());
    formData.append("height", size.height.toString());
    const requestInit: RequestInit = {
        method: "POST",
        body: formData
    }
    const resp = await fetch(url, requestInit);
    if (resp.status == 201) {
        return await resp.blob();
    } else {
        throw new Error("Ops! Something went wrong on generating you cross stitch pattern.")
    }
}


export const PatternService = {
    generatePatterm: generatePattern
};
