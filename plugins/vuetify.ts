// import this after install `@mdi/font` package
import '@mdi/font/css/materialdesignicons.css'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import { useDisplay } from 'vuetify'

// Import theme or customize your theme here
import { aliases, mdi } from 'vuetify/iconsets/mdi'

export default defineNuxtPlugin((app) => {
    const vuetify = createVuetify({
        theme: {
            defaultTheme: 'light', // Default theme
            themes: {
                light: {
                    dark: false,
                    colors: {
                        background: '#ffffff',
                        surface: '#ffffff',
                        primary: '#48647f',
                        'primary-darken-1': '#3700b3',
                        secondary: '#03dac6',
                        'secondary-darken-1': '#018786',
                        error: '#b00020',
                        info: '#2196f3',
                        success: '#4caf50',
                        warning: '#fb8c00',
                    },
                },
                dark: {
                    dark: true,
                    colors: {
                        background: '#121212',
                        surface: '#121212',
                        primary: '#34424f',
                        'primary-darken-1': '#3700b3',
                        secondary: '#03dac6',
                        'secondary-darken-1': '#03dac6',
                        error: '#cf6679',
                        info: '#2196f3',
                        success: '#4caf50',
                        warning: '#fb8c00',
                    },
                },
            },
        },
        icons: {
            defaultSet: 'mdi',
            aliases,
            sets: {
                mdi,
            },
        },
    })

    app.vueApp.use(vuetify)
})