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
            verdeclaro: '#80ED99',
            casiblanco: '#C7F9CC',
            blanco: '#ffffff',
            negro: '#000000',
            rojoclaro: '#FFAFAF',
            rojo: '#FF3333',
            amarillo: '#FFC107',
        },
    },
    plugins: [],
};
