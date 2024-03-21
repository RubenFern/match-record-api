/** @type {import('tailwindcss').Config} */
module.exports =
{
    darkMode: 'selector',
    content: ["./src/**/*.{html,ts}",],
    theme: {
        extend: {
            backgroundColor: {
              'dark-mode': '#171717'
            },
        },
    },
    plugins: [],
}

