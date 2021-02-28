const colors = require('tailwindcss/colors')

module.exports = {
  purge: ["./components/**/*.{js,ts,jsx,tsx}", "./pages/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
        typography: (theme) => ({
            DEFAULT: {
                css: [
                {
                    color: theme('colors.gray.400'),
                    h1: {
                        color: theme('colors.gray.100'),
                        fontWeight: '800',
                    },
                    h2: {
                        color: theme('colors.gray.100'),
                        fontWeight: '700',
                    },
                    h3: {
                        color: theme('colors.gray.100'),
                        fontWeight: '600',
                    },
                    h4: {
                        color: theme('colors.gray.100'),
                        fontWeight: '600',
                    },
                    thead: {
                        color: theme('colors.gray.100'),
                    },
                },
                ],
            },
            lg: {
                css: [
                {
                    h2: {
                    marginTop: '1.0666667em',
                    marginBottom: '1.0666667em',
                    },
                },
                ],
            },
        }),    
    },
  },
  variants: {
    extend: {
      typography: ['dark'],
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
