const Footer = () => {
    return (
        <footer className="bg-azuloscuro h-52 flex flex-col items-center justify-between">
            <img
                src="/Logo/Hack-a-ton.png"
                alt="Logo"
                className="h-28 mt-10 "
            />
            <p className="font-jost font-semibold mb-2">
                {' '}
                &copy; HACKABOSS - Grupo B - 2024
            </p>
        </footer>
    );
};

export default Footer;
