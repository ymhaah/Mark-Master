function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer>
            <p>
                Copy Right &copy;
                {currentYear} -Mark Master-
            </p>
        </footer>
    );
}

export default Footer;
