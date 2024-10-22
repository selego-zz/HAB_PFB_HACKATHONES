const Footer = () => {
    return (
        <footer className="bg-azuloscuro h-fit w-max-6xl flex flex-col items-center p-4 justify-between md:flex-row md:justify-around">
            <div className="flex flex-col items-center">
                <img
                    src="/logo/app-logo2.png"
                    alt="Logo de la página."
                    className="h-28"
                />
                <div className="flex mt-4 space-x-4 justify-center items-center">
                    <a
                        href="https://facebook.com"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <img
                            src="/assets/icons/footer/facebook.png"
                            alt="Facebook"
                            className="h-6"
                        />
                    </a>
                    <a
                        href="https://youtube.com"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <img
                            src="/assets/icons/footer/youtube.png"
                            alt="Youtube"
                            className="h-6"
                        />
                    </a>
                    <a
                        href="https://instagram.com"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <img
                            src="/assets/icons/footer/instagram.png"
                            alt="Instagram"
                            className="h-6"
                        />
                    </a>
                    <a
                        href="https://linkedin.com"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <img
                            src="/assets/icons/footer/linkedin.png"
                            alt="LinkedIn"
                            className="h-6"
                        />
                    </a>
                </div>
            </div>
            <div className="flex flex-col items-center md:items-start p-6">
                <ul className="space-y-2">
                    <li>
                        <a
                            href="/about-us"
                            className="font-jost font-semibold text-blanco"
                        >
                            Sobre nosotros
                        </a>
                    </li>
                    <li>
                        <a
                            href="/privacy"
                            className="font-jost font-semibold text-blanco"
                        >
                            Política de privacidad
                        </a>
                    </li>
                </ul>
            </div>
            <p className="font-jost font-semibold text-center m-2">
                &copy; HACK-A-BOSS, <br />
                JSB40RT Grupo B, <br />
                2024
            </p>
        </footer>
    );
};

export default Footer;
