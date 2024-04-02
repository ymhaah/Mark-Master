function Setting() {
        // const waterMarkTextInput = document.querySelector(
    //     "#waterMark-text"
    // ) as HTMLInputElement;

    // const downloadBtn = document.querySelector(
    //     "#download-button"
    // ) as HTMLAnchorElement;

    return (
        <div id="waterMark-settings">
            <input
                type="text"
                id="waterMark-text"
                aria-label="waterMark text input"
                placeholder="WaterMark"
                max-length="10"
            />
            <a
                href="#"
                download="image.png"
                className="button btn-primary"
                id="download-button"
                role="button"
                data-active="false"
                data-disabled="true"
                aria-disabled="true"
            >
                <span className="visually-hidden">download</span>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24"
                    viewBox="0 -960 960 960"
                    width="24"
                >
                    <path d="M480-320 280-520l56-58 104 104v-326h80v326l104-104 56 58-200 200ZM240-160q-33 0-56.5-23.5T160-240v-120h80v120h480v-120h80v120q0 33-23.5 56.5T720-160H240Z" />
                </svg>
            </a>
        </div>
    );
}

export default Setting;
