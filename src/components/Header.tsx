function Header() {
    // const additionalButtons = () => {
    //     switch (filesState.state) {
    //         case "waiting":
    //             return (
    //                 <button className="button btn-primary">
    //                     Select File
    //                 </button>
    //             );
    //         case "downloading":
    //             return (
    //                 <button
    //                     type="button"
    //                     className="button btn-primary"
    //
    //                 >
    //                     Download
    //                 </button>
    //             );
    //         default:
    //             return (
    //                 <button type="button" className="button btn-primary">
    //                     Select File
    //                 </button>
    //             );
    //     }
    // };

    return (
        <header>
            <div className="logo">
                <a href="/index.html">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24"
                        viewBox="0 -960 960 960"
                        width="24"
                    >
                        <path d="M172-488q25-87 101.5-184.5T480-880q130 110 206.5 207.5T788-488h-84q-23-62-79-133.5T480-774q-88 81-144.5 152.5T256-488h-84Zm622 146q-9 49-31.5 92.5T705-171q-35 35-78.5 57T535-84l259-258Zm-163-66h114L421-84q-23-5-44.5-11.5T335-113l296-295Zm-229 0h114L267-159q-15-14-28.5-29T214-220l188-188Zm-243 0h127L176-298q-8-27-12-54.5t-5-55.5Zm321-80Z" />
                    </svg>
                    <h1 className="logo-text">Mark Master</h1>
                </a>
            </div>
            {/* <nav>{additionalButtons()}</nav> */}
        </header>
    );
}

export default Header;
