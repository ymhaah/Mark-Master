// import { useEffect } from "react";

// function useImageUpload(
//     inputImageUploader: HTMLInputElement,
//     images: File[],
//     runFunction: (image: File) => void
// ) {
//     useEffect(() => {
//         console.log("u");
//         function handleFileChange(e: Event) {
//             console.log("f");
//             const imagesFiles = (e.target as HTMLInputElement).files;
//             if (imagesFiles) {
//                 for (let i = 0; i < imagesFiles.length; i++) {
//                     runFunction(imagesFiles[i]);
//                 }
//             }
//         }
//         function handleDrop(e: DragEvent) {
//             e.preventDefault();
//             const imagesFiles = e.dataTransfer!.files;
//             if (imagesFiles) {
//                 for (let i = 0; i < imagesFiles.length; i++) {
//                     if (!imagesFiles[i].type.match("image")) {
//                         continue;
//                     }
//                     if (
//                         images.every(
//                             (image: File) => image.name !== imagesFiles[i].name
//                         )
//                     ) {
//                         runFunction(imagesFiles[i]);
//                     }
//                 }
//             }
//         }
//         function handleDragOver(e: DragEvent) {
//             e.preventDefault();
//         }
//         if (inputImageUploader) {
//             console.log("is");
//             inputImageUploader.addEventListener("change", handleFileChange);
//             inputImageUploader.addEventListener("drop", handleDrop);
//             inputImageUploader.addEventListener("dragover", handleDragOver);
//         }

//         // return () => {
//         //     if (inputImageUploader) {
//         //         inputImageUploader.removeEventListener(
//         //             "change",
//         //             handleFileChange
//         //         );
//         //         inputImageUploader.removeEventListener("drop", handleDrop);
//         //         inputImageUploader.removeEventListener(
//         //             "dragover",
//         //             handleDragOver
//         //         );
//         //     }
//         // };
//     }, [images, inputImageUploader, runFunction]);
// }

// export default useImageUpload;
