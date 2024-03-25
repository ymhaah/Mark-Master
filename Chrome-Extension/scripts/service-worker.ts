// // service worker / background

// // TODO: make an exclude_matches for performance

// // ? high level var (used a lot) => Name_Name

// chrome.webRequest.onBeforeRequest.addListener(
//     (details: any) => {
//         if (details.method === "POST" && details.requestBody) {
//             console.log(details);
//             return {
//                 cancel: true,
//                 requestHeaders: details.requestHeaders,
//                 requestBody: {
//                     formData: "the new data go here",
//                 },
//             };
//         }
//         return {
//             cancel: false,
//         };
//     },
//     {
//         urls: ["<all_urls>"],
//         types: ["main_frame", "sub_frame", "xmlhttprequest"],
//     },
//     ["blocking", "requestBody"]
// );

// chrome.webRequest.onBeforeRequest.addListener(
//     (details: chrome.webRequest.WebRequestBodyDetails) => {
//         if (
//             details.method === "POST" &&
//             details.requestBody &&
//             details.requestBody.formData
//         ) {
//             for (const key in details.requestBody.formData) {
//                 const fileArray = details.requestBody.formData[key];
//                 for (let i = 0; i < fileArray.length; i++) {
//                     // Modify properties of the file (e.g., rename, resize, etc.)
//                     const modifiedFile = modifyFile(fileArray[i] as File);

//                     // Replace the original file with the modified one
//                     details.requestBody.formData[key][i] = modifiedFile;
//                 }
//             }
//         }
//         return { requestBody: details.requestBody };
//     },
//     { urls: ["<all_urls>"], types: ["xmlhttprequest"] },
//     ["blocking", "requestBody"]
// );

// function modifyFile(file: File): File {
//     const modifiedFile = file;
//     modifiedFile.name = "modified_" + modifiedFile.name;
//     return modifiedFile;
// }

// type supportedWebsiteT = {
//     URL: string;
//     TYPE: "SPA" | "Regular";
// };

// const Supported_Websites: supportedWebsiteT[] = [
//     { URL: "https://twitter.com", TYPE: "SPA" },
// ];

// let Current_Url: string | null;

// // ? Check if the current URL matches any of the supported websites
// function isSupportedWebsite(currentURL: string): boolean {
//     return Supported_Websites.some((site) => currentURL.startsWith(site.URL));
// }

// function getCurrentUrl(): Promise<{
//     URL: string;
//     tabId: number | undefined;
// } | null> {
//     return new Promise((resolve) => {
//         chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
//             if (!tabs || tabs.length === 0 || !tabs[0]?.url) {
//                 resolve(null);
//                 return;
//             }

//             const URL = tabs[0].url;
//             const tabId = tabs[0].id;

//             if (isSupportedWebsite(URL)) {
//                 resolve({ URL, tabId });
//             } else {
//                 resolve(null);
//             }
//         });
//     });
// }

// // ? Send a message with the url to the content script
// async function sendCurrentUrl(
//     currentUrl: string,
//     tabId: number
// ): Promise<void> {
//     try {
//         const response = await new Promise<void>((resolve) => {
//             chrome.tabs.sendMessage(tabId, { url: currentUrl }, resolve);
//         });

//         console.log("Received response from content script:", response);
//     } catch (error) {
//         console.error("Error sending message:", error);
//     }
// }

// async function handelUrl(): Promise<void> {
//     const URL_info = await getCurrentUrl();

//     if (URL_info && URL_info.URL && URL_info.tabId) {
//         Current_Url = URL_info.URL;
//         await sendCurrentUrl(Current_Url, URL_info.tabId);
//     } else {
//         Current_Url = null;
//     }
// }
// handelUrl();

// // ? Listen for history state changes (for SPAs)
// chrome.webNavigation.onHistoryStateUpdated.addListener(handelUrl);

// // ? Listen for page load events (for regular pages)
// chrome.webNavigation.onCompleted.addListener(handelUrl);
