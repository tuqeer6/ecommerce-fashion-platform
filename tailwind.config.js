/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    light: '#2dd4bf', // teal-400
                    DEFAULT: '#0d9488', // teal-600
                    dark: '#134e4a', // teal-900
                },
                accent: {
                    light: '#fbbf24', // amber-400
                    DEFAULT: '#d97706', // amber-600
                    dark: '#92400e', // amber-800
                },
                gold: {
                    light: '#fde68a',
                    DEFAULT: '#fbbf24',
                    dark: '#d97706',
                }
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                display: ['Outfit', 'sans-serif'],
            }
        },
    },
    plugins: [],
}
