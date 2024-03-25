"use strict";
// contentScript.js
// TODO:
// ? high level var (used a lot) => Name_Name
let inputs = document.querySelectorAll("input[type='file']");
function handlePageUpdate(mutationsList, observer) {
    for (const mutation of mutationsList) {
        if (mutation.type === "childList" && mutation.addedNodes.length > 0) {
            const addedElement = mutation.addedNodes[0];
            inputs = document.querySelectorAll("input[type='file']");
            for (let input of inputs) {
                if (input) {
                    input.addEventListener("change", handleFileUpload);
                }
            }
        }
    }
}
function handleFileUpload(event) {
    const input = event.target;
    if (input.files && input.files.length > 0 && input) {
        for (let i = 0; i < input.files.length; i++) {
            const file = input.files[i];
            const reader = new FileReader();
            reader.onload = function (e) {
                const img = new Image();
                img.src = e.target.result;
                img.onload = function () {
                    const canvas = document.createElement("canvas");
                    canvas.width = img.width;
                    canvas.height = img.height;
                    const ctx = canvas.getContext("2d");
                    ctx.drawImage(img, 0, 0);
                    const text = "Hello World!";
                    ctx.font = "20px Arial";
                    ctx.fillStyle = "white";
                    ctx.fillText(text, 20, 30);
                    const modifiedImage = canvas.toDataURL(file.type);
                    const modifiedFile = createFile(modifiedImage, file.name, file.type);
                    const dataTransfer = new DataTransfer();
                    dataTransfer.items.add(modifiedFile);
                    if (input) {
                        input.files = dataTransfer.files;
                    }
                    if (input.webkitEntries.length) {
                        input.dataset.file = `${dataTransfer.files[0].name}`;
                    }
                };
            };
            reader.readAsDataURL(file);
        }
    }
}
function createFile(content, filename, mimeType) {
    const encoder = new TextEncoder();
    const arrayBuffer = encoder.encode(content.split(",")[1]);
    const lastModified = Date.now();
    return new File([arrayBuffer], filename, { type: mimeType, lastModified });
}
const pageUpdateObserver = new MutationObserver(handlePageUpdate);
pageUpdateObserver.observe(document.body, {
    childList: true,
    subtree: true,
});
// document.addEventListener("DOMContentLoaded", () => {
//     document.body.addEventListener("change", handleFileUpload);
// });
// function handleFileUpload(event: Event) {
//             if (files && files.length > 0) {
//                 const dataTransfer = new DataTransfer();
//                 for (let i = 0; i < files.length; i++) {
//                     const modifiedFile = modifyFile(files[i]);
//                     dataTransfer.items.add(modifiedFile);
//                 }
//                 input.files = dataTransfer.files;
//                 console.log(files);
//             }
//         });
//     }
// }
// function modifyFile(file: File): File {
//     const modifiedFile = new File([file], "modified_" + file.name, {
//         type: file.type,
//         lastModified: file.lastModified,
//     });
//     return modifiedFile;
// }
// ? Process the message and send a response back if needed
// chrome.runtime.onMessage.addListener(
//     (request: { url: string }, sender, sendResponse) => {
//         let page_URL = new URL(request.url);
//         let pathName = page_URL.pathname;
//         const urlPateLevels = pathName.split("/");
//         // ! will only by the right name in the profile page if you want use.
//         Profile_Name = urlPateLevels[urlPateLevels.length - 1];
//         const response = { Profile_Name: Profile_Name };
//         sendResponse(response);
//     }
// );
// function isElementLoaded(
//     elementPath: string,
//     father?: Element | null
// ): boolean {
//     if (father instanceof Element) {
//         const element = father.querySelector(elementPath);
//         return element !== null;
//     } else {
//         const element = document.querySelector(elementPath);
//         return element !== null;
//     }
// }
// function extractNumberFromString(inputString: string): number {
//     // Check if the input string contains a 'K', 'M', 'B', or 'T' suffix
//     if (/\b[KkMmBbTt]\b/.test(inputString)) {
//         return convertToNumber(inputString);
//     }
//     // If no suffix is present, extract the number using the original logic
//     const extractedNumber = parseInt(inputString.replace(/\D/g, ""), 10) || 0;
//     return extractedNumber;
// }
// function calculatePercentage(
//     engagementNum: number,
//     followerNum: number
// ): string | null {
//     if (engagementNum === 0 || followerNum === 0) {
//         return null;
//     }
//     let percentage = Math.floor((engagementNum / followerNum) * 100);
//     if (percentage < 1) {
//         percentage = (engagementNum / followerNum) * 100;
//     }
//     return `${percentage}%`;
// }
// function convertToNumber(input: string): number {
//     const regex = /^(\d+(\.\d+)?)\s*([KkMmBbTt])?$/;
//     const match = input.match(regex);
//     if (match) {
//         const baseNumber = parseFloat(match[1]);
//         const multiplier = (() => {
//             switch ((match[3] || "").toUpperCase()) {
//                 case "K":
//                     return 1000;
//                 case "M":
//                     return 1000000;
//                 case "B":
//                     return 1000000000;
//                 case "T":
//                     return 1000000000000;
//                 default:
//                     return 1;
//             }
//         })();
//         return baseNumber * multiplier;
//     }
//     return 0;
// }
