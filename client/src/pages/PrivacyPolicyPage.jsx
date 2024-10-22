const PrivacyPolicyPage = () => {
    return (
        <div className="bg-casiblanco min-h-screen py-10 px-4 sm:px-10 lg:px-20 max-w-full">
            <div className="max-w-5xl mx-auto">
                <h1 className="text-center text-3xl font-jost font-semibold text-azuloscuro mb-10">
                    Política de Privacidad
                </h1>
                <p className="text-verdeagua text-lg mb-4 text-center">
                    Última actualización: 22 de octubre de 2024
                </p>
                <div className="bg-blanco p-8 rounded-lg shadow-lg">
                    <section className="mb-8">
                        <h2 className="text-2xl font-jost text-azuloscuro mb-4">
                            1. Introducción
                        </h2>
                        <p className="text-negro mb-4">
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Donec feugiat, libero ut pulvinar aliquet,
                            urna nunc malesuada urna, ac vestibulum dolor felis
                            sed orci. Vivamus nec pharetra nisl, nec scelerisque
                            sapien. Curabitur venenatis fringilla mauris in
                            egestas. Sed a enim sit amet quam sagittis tincidunt
                            ac a massa.
                        </p>
                        <p className="text-negro">
                            Fusce vestibulum libero a mauris interdum, ac
                            tincidunt mi sollicitudin. Nulla facilisi. Phasellus
                            ut diam sed justo vehicula viverra. Nam et mauris
                            non nisl posuere egestas.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-jost text-azuloscuro mb-4">
                            2. Información que Recopilamos
                        </h2>
                        <p className="text-negro mb-4">
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Nulla ultrices, sapien ac tincidunt
                            pellentesque, elit justo lacinia lorem, at facilisis
                            libero dui at odio. Integer sit amet sapien nec
                            purus gravida accumsan id in mauris.
                        </p>
                        <ul className="list-disc list-inside text-negro">
                            <li>Información de identificación personal</li>
                            <li>Datos de uso y cookies</li>
                            <li>
                                Información de contacto (correo electrónico,
                                etc.)
                            </li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-jost text-azuloscuro mb-4">
                            3. Cómo Usamos su Información
                        </h2>
                        <p className="text-negro">
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Donec tempor, est vel gravida vulputate, erat
                            eros posuere felis, et dictum sem justo non est.
                            Praesent scelerisque magna euismod, facilisis felis
                            vel, vulputate dui.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-jost text-azuloscuro mb-4">
                            4. Protección y Seguridad de los Datos
                        </h2>
                        <p className="text-negro mb-4">
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Vestibulum ante ipsum primis in faucibus orci
                            luctus et ultrices posuere cubilia curae; Integer
                            congue lectus id ullamcorper dapibus.
                        </p>
                        <p className="text-negro">
                            Nunc ut tortor vitae libero luctus suscipit. Donec
                            ut tortor sit amet tortor ullamcorper tempor. Cras
                            consequat felis et enim mollis, ac convallis velit
                            facilisis.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-jost text-azuloscuro mb-4">
                            5. Cambios a Esta Política
                        </h2>
                        <p className="text-negro">
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Nullam vulputate nisl nec eros aliquet
                            lacinia. Suspendisse potenti. Duis non ante at
                            libero consequat dignissim.
                        </p>
                        <p className="text-negro">
                            Nos reservamos el derecho de actualizar o modificar
                            esta política de privacidad en cualquier momento.
                            Los cambios serán efectivos inmediatamente después
                            de su publicación.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-jost text-azuloscuro mb-4">
                            6. Contáctenos
                        </h2>
                        <p className="text-negro">
                            Si tiene alguna pregunta sobre esta Política de
                            Privacidad, puede contactarnos por correo
                            electrónico en:{' '}
                            <span className="text-verdeclaro font-semibold">
                                privacy@ourcompany.com
                            </span>
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicyPage;
