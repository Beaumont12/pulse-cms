import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Poppins', 'Figtree', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                'main-maroon' : '#450001',
                'custom-maroon' : '#660200',
                'main-red' : '#8E0000',
                'custom-red' : '#C12923',
                'light-red' : '#C12923',
                'custom-pink' : '#FFA8A2',
                'light-pink' : '#FEEBEA',
                'main-black' : '#222831',
                'light-black' : '#333333',
                'main-white' : '#FAFAFF',
                'main-green' : '#00A86B',
                'main-yellow' : '#FFC72C',
            }
        },
    },

    plugins: [forms],
};
