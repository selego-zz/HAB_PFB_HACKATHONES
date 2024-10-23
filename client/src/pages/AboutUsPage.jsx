import { useDocumentTitle } from '../hooks';

const developers = [
    {
        name: 'Amanda González',
        image: '/assets/images/am.png',
        github: 'https://github.com/Amanda-Gonzalez-Cotrina',
        linkedin: 'https://linkedin.com/in/amanda-gonzález-cotrina',
    },
    {
        name: 'Bruno Martí',
        image: '/assets/images/br.png',
        github: 'https://github.com/selego-zz',
        linkedin: 'https://linkedin.com/in/brunomartiluis/',
    },
    {
        name: 'Emilio Sánchez',
        image: '/assets/images/em.png',
        github: 'https://github.com/EmilioSanchez87',
        linkedin: 'https://www.linkedin.com/in/emiliosasanchez/',
    },
    {
        name: 'Rodrigo Masid',
        image: '/assets/images/ro.png',
        github: 'https://github.com/r0dmd',
        linkedin: 'https://www.linkedin.com/in/rodrigo-md/',
    },
];

// Página "Sobre nosotros"
const AboutUsPage = () => {
    useDocumentTitle('Sobre Nosotros');

    return (
        <div className="bg-casiblanco h-auto flex flex-col items-center justify-center py-10">
            <h1 className="text-center text-3xl font-jost font-semibold text-azuloscuro mb-10">
                Conoce al equipo
            </h1>
            <div className="flex flex-wrap justify-center gap-8 w-full">
                {developers.map((dev, index) => (
                    <div
                        key={index}
                        className="bg-blanco bg-opacity-60 rounded-lg shadow-lg p-6 transform transition duration-500 hover:bg-opacity-100 hover:scale-105 hover:shadow-2xl w-full max-w-60"
                    >
                        <img
                            className="rounded-full w-32 h-32 mx-auto mb-4"
                            src={dev.image}
                            alt={dev.name}
                        />
                        <h2 className="text-2xl font-jost text-azuloscuro text-center">
                            {dev.name}
                        </h2>

                        <div className="flex justify-center gap-4 mt-4">
                            <a
                                href={dev.github}
                                target="_blank"
                                className="text-blanco bg-azuloscuro p-2 rounded-full hover:bg-verdeagua"
                                rel="noopener noreferrer"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                >
                                    <path d="M12 0C5.373 0 0 5.373 0 12c0 5.303 3.438 9.8 8.205 11.387.6.11.793-.261.793-.582v-2.257c-3.338.724-4.042-1.416-4.042-1.416-.546-1.387-1.333-1.758-1.333-1.758-1.089-.744.083-.729.083-.729 1.204.084 1.838 1.235 1.838 1.235 1.07 1.833 2.809 1.303 3.495.997.108-.774.418-1.303.762-1.602-2.665-.304-5.466-1.332-5.466-5.93 0-1.31.469-2.38 1.235-3.222-.124-.303-.535-1.524.117-3.176 0 0 1.007-.322 3.3 1.23a11.483 11.483 0 0 1 3-.404c1.02.005 2.042.137 3 .404 2.29-1.553 3.296-1.23 3.296-1.23.653 1.653.243 2.874.12 3.176.77.843 1.232 1.912 1.232 3.222 0 4.61-2.806 5.624-5.479 5.92.43.37.815 1.102.815 2.222v3.293c0 .324.19.696.801.58C20.565 21.795 24 17.3 24 12 24 5.373 18.627 0 12 0z" />
                                </svg>
                            </a>
                            <a
                                href={dev.linkedin}
                                target="_blank"
                                className="text-blanco bg-verdemarino p-2 rounded-full hover:bg-verdeagua"
                                rel="noopener noreferrer"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                >
                                    <path d="M19.67 3H4.33A1.33 1.33 0 0 0 3 4.33v15.34A1.33 1.33 0 0 0 4.33 21h15.34A1.33 1.33 0 0 0 21 19.67V4.33A1.33 1.33 0 0 0 19.67 3zm-11.66 16h-3v-9h3v9zM6.5 8.75C5.67 8.75 5 8.08 5 7.25S5.67 5.75 6.5 5.75 8 6.42 8 7.25s-.67 1.5-1.5 1.5zm13.17 10.25h-3v-4.62c0-1.1-.4-1.84-1.39-1.84-.76 0-1.21.51-1.41 1-.07.17-.09.4-.09.64v4.82h-3v-9h3v1.23h.04a3.16 3.16 0 0 1 2.86-1.57c2.08 0 3.65 1.36 3.65 4.29v5.05z" />
                                </svg>
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AboutUsPage;
