function Canvas({
    updateImages,
    images,
    updateFilesState,
}: {
    updateImages: (newImages: File) => void;
    images: File[];
    updateFilesState: (
        newState: "waiting" | "loading" | "uploaded" | "downloading"
    ) => void;
}) {
    return <div></div>;
}

export default Canvas;
