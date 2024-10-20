/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            fontFamily: {
                jost: ['Jost', 'sans-serif'],
            },
        },
        colors: {
            azuloscuro: '#22577A',
            verdeagua: '#38A3A5',
            verdemarino: '#57CC99',
            verdeclaro: '#A6F2B7',
            casiblanco: '#C7F9CC',
            verde2: '#d8f3dc',
            blanco: '#ffffff',
            negro: '#000000',
            rojoclaro: '#FFAFAF',
            rojo: '#FF3333',
            amarillo: '#FFC107',
        },
    },
    plugins: [],
};
