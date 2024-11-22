import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/**/*.blade.php',
        './resources/**/*.js',
        './resources/**/*.vue',
    ],
    theme: {
        extend: {
            colors:{
                'rick-green':'#00FF00',
                'dark-grey': '#111111',
                'yellow': '#FFDD00',
                'rick-blue': '00B5E2',
                'purple': '9B4D96',
            },
            fontFamily: {
                sans: ['Figtree', 'Arial', 'sans-serif'],
                'press-start': ['"Press Start 2P"', 'cursive'],
            },
        },
    },
    plugins: [],
};
