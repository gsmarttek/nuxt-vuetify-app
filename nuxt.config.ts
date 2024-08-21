import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
import { resolve } from 'path'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  css: [
    'vuetify/styles',
  ],
  publicRuntimeConfig: {
    apiBaseUrl: process.env.API_BASE_URL
  },
  build: {
    transpile: ['vuetify'],
  },
  modules: [
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig',
        (config) => {
          // @ts-expect-error
          config.plugins.push(vuetify({ autoImport: true }))
        })
    },
    '@vueuse/nuxt',
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
    globalAppMiddleware: false,
    baseURL: process.env.API_BASE_URL + 'Auth/',
    provider: {
      type: 'refresh',
      endpoints: {
        signIn: { path: 'Login', method: 'post' },
        signOut: { path: 'Logout', method: 'post' },
        signUp: { path: 'Registration', method: 'post' },
        getSession: { path: 'GetUser', method: 'get' },
        refresh: { path: 'Refresh', method: 'post' }
      },
      token: {
        property: 'token',
        maxAge: 1800,
        global: true,
      },
      refreshToken: {
        property: 'refreshToken',
        data: 'refreshToken',
        maxAge: 60 * 60 * 24 * 30,
        signInResponseRefreshTokenPointer: '/refreshToken'
      },
    },
    sessionDataType: { username: 'string', projects: "{ id: number, name: string }[]" },
    session: {
      enableRefreshPeriodically: 1000 * 60 * 60,
      enableRefreshOnWindowFocus: true,
    }
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
