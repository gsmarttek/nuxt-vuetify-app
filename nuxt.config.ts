import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
import { resolve } from 'path'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  css: [
    'vuetify/styles',
  ],
  build: {
    transpile: ['vuetify'],
  },
  runtimeConfig: {
    authSecret: process.env.AUTH_SECRET,
  },
  modules: [
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig',
        (config) => {
          // @ts-expect-error
          config.plugins.push(vuetify({ autoImport: true }))
        })
    },
    '@sidebase/nuxt-auth',
  ],
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
  auth: {
    baseURL: process.env.APP_ORIGIN,
    provider: {
      type: 'authjs',
    },
  },
  app: {
    head: {
      title: "My Nuxt App",
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1' }
      ]
    }
  }
})
