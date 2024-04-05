import { useRef, useEffect } from "react";

function InputImage({
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
    const inputImageUploader = useRef<HTMLInputElement>(null);

    useEffect(() => {
        function handleFileChange(e: Event) {
            console.log("f");
            const imagesFiles = (e.target as HTMLInputElement).files;
            if (imagesFiles) {
                for (let i = 0; i < imagesFiles.length; i++) {
                    // updateImages(imagesFiles[i]);
                    updateImages(imagesFiles[0]);
                    updateFilesState("downloading");
                }
            }
        }
        function handleDrop(e: DragEvent) {
            e.preventDefault();
            const imagesFiles = e.dataTransfer!.files;
            if (imagesFiles) {
                for (let i = 0; i < imagesFiles.length; i++) {
                    if (!imagesFiles[i].type.match("image")) {
                        continue;
                    }
                    if (
                        images.every(
                            (image: File) => image.name !== imagesFiles[i].name
                        )
                    ) {
                        // updateImages(imagesFiles[i]);
                        updateImages(imagesFiles[0]);
                        updateFilesState("downloading");
                    }
                }
            }
        }
        function handleDragOver(e: DragEvent) {
            e.preventDefault();
        }
        if (inputImageUploader.current) {
            inputImageUploader.current.addEventListener(
                "change",
                handleFileChange
            );
            inputImageUploader.current.addEventListener("drop", handleDrop);
            inputImageUploader.current.addEventListener(
                "dragover",
                handleDragOver
            );
        }

        return () => {
            // eslint-disable-next-line react-hooks/exhaustive-deps
            const inp = inputImageUploader.current;
            if (inp) {
                inp.removeEventListener("change", handleFileChange);
                inp.removeEventListener("drop", handleDrop);
                inp.removeEventListener("dragover", handleDragOver);
            }
        };
    }, [images, updateFilesState, updateImages]);

    return (
        <div id="image-upload">
            <div className="uploader">
                <span>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24"
                        viewBox="0 -960 960 960"
                        width="24"
                    >
                        <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h360v80H200v560h560v-360h80v360q0 33-23.5 56.5T760-120H200Zm480-480v-80h-80v-80h80v-80h80v80h80v80h-80v80h-80ZM240-280h480L570-480 450-320l-90-120-120 160Zm-40-480v560-560Z" />
                    </svg>
                </span>
                <button type="button" className="button btn-primary">
                    Select File
                </button>
                <span>or drag your files here</span>
                <input
                    type="file"
                    ref={inputImageUploader}
                    className="file-uploader"
                    accept="image/png, image/jpeg, image/jpg"
                    aria-label="image upload area"
                />
            </div>
        </div>
    );
}

export default InputImage;
