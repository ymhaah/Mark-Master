// selected images Array
const images: File[] = [];

const waterMarkTextInput = document.querySelector(
    "#waterMark-text"
) as HTMLInputElement;
const inputImageUploader = document.querySelector(
    "input#file-uploader"
) as HTMLInputElement;
const uploadedImageArea = document.querySelector(".uploader");
const downloadBtn = document.querySelector(
    "#download-button"
) as HTMLAnchorElement;

if (inputImageUploader) {
    inputImageUploader.addEventListener("change", (e) => {
        let imagesFiles = (e.target as HTMLInputElement).files;
        if (imagesFiles) {
            // for (let i = 0; i < imagesFiles.length; i++) {
            //     images.push(imagesFiles[i]);
            // }
            images.push(imagesFiles[0]);
            displayImage();
        }
    });
}

// Event listeners for drag-and-drop
if (uploadedImageArea) {
    uploadedImageArea.addEventListener("drop", (e: any) => {
        e.preventDefault();
        let imagesFiles = e.dataTransfer.files;
        if (imagesFiles) {
            for (let i = 0; i < imagesFiles.length; i++) {
                if (!imagesFiles[i].type.match("image")) {
                    continue;
                }
                if (
                    images.every((image) => image.name !== imagesFiles[i].name)
                ) {
                    // images.push(imagesFiles[i]);
                    images.push(imagesFiles[0]);
                }
            }
            displayImage();
        }
    });
    uploadedImageArea.addEventListener("dragover", (e) => e.preventDefault());
}

function displayImage() {
    let textStyleOptions = {
        fontSize: 30,
        fontFamily: "Arial",
        textColor: "rgba(255, 255, 255, 0.4)",
        textAlign: "left",
    };

    let inputTextValue = "";
    waterMarkTextInput?.addEventListener("input", (e) => {
        inputTextValue = (e.target as HTMLInputElement).value;
        addWaterMark(images[0], inputTextValue, 10, 10, textStyleOptions);
    });
    addWaterMark(images[0], inputTextValue, 10, 10, textStyleOptions);

    // images.forEach((image, i) => {
    //     let inputTextValue = "";
    //     waterMarkTextInput?.addEventListener("input", (e) => {
    //         inputTextValue = (e.target as HTMLInputElement).value;
    //         addWaterMark(
    //             URL.createObjectURL(image),
    //             inputTextValue,
    //             10,
    //             10,
    //             textStyleOptions
    //         );
    //     });
    //     addWaterMark(
    //         URL.createObjectURL(image),
    //         inputTextValue,
    //         10,
    //         10,
    //         textStyleOptions
    //     );
    // });
}
// function deleteImage(i: number) {
//     images.splice(i, 1);
//     displayImage();
// }

function addWaterMark(
    imageFile: File,
    waterMarkText: string,
    xCordOfText: number,
    yCordOfText: number,
    textStyleOptions: {
        fontSize: number;
        fontFamily: string;
        textColor: string;
        textAlign: string | CanvasTextAlign;
    }
) {
    let canvas = document.createElement("canvas");
    // canvas.setAttribute("id", "")
    if (uploadedImageArea) {
        let uploadedImageAreaInfo = uploadedImageArea.getBoundingClientRect();
        uploadedImageArea.appendChild(canvas);

        canvas.width = uploadedImageAreaInfo.width;
        canvas.height = uploadedImageAreaInfo.height;

        let ctx = canvas.getContext("2d");
        let img = new Image();

        img.onload = () => {
            let scale = Math.min(
                canvas.width / img.width,
                canvas.height / img.height
            );

            let newWidth = img.width * scale;
            let newHeight = img.height * scale;

            let x = canvas.width / 2 - newWidth / 2;
            let y = canvas.height / 2 - newHeight / 2;

            if (ctx) {
                ctx.drawImage(img, x, y, newWidth, newHeight);

                // Set all the properties of the text based on the input params
                ctx.font = `${textStyleOptions.fontSize}px ${textStyleOptions.fontFamily}`;
                ctx.fillStyle = textStyleOptions.textColor;
                ctx.textAlign = textStyleOptions.textAlign as CanvasTextAlign;

                ctx.textBaseline = "top";

                ctx.fillText(waterMarkText, xCordOfText, yCordOfText);

                downloadBtn.setAttribute("data-active", "true");
                downloadBtn.setAttribute("disabled", "false");
                downloadBtn.setAttribute("aria-disabled", "false");

                enableDownloadButton(canvas.toDataURL("image/png"));
            }
        };
        img.src = URL.createObjectURL(imageFile);
    }
}

function enableDownloadButton(url: string) {
    downloadBtn.setAttribute("data-active", "true");
    downloadBtn.removeAttribute("disabled");
    downloadBtn.setAttribute("aria-disabled", "false");
    downloadBtn.href = url;
}

// TODO: in the website make what is shown not the canvas but an image with text for performance and easy of dev
// TODO: make it responsive with the website
// TODO: add support for zoom and moving in the image to fix large image problems
// TODO: add support for more than one image at a time
// TODO: separate between the canvas creation and adding the watermark
// TODO: control watermark setting
