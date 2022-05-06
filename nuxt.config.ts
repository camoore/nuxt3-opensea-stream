import { defineNuxtConfig } from "nuxt";
import tailwind from "@nuxtjs/tailwindcss";
import colormode from "@nuxtjs/color-mode"
// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  runtimeConfig: {
    OPENSEA_API_KEY:  process.env.OPENSEA_API_KEY ||  "",
    public: {
        OPENSEA_API_KEY: process.env.OPENSEA_API_KEY
    }
  },
  buildModules: [
      tailwind,
      colormode,
  ],
  tailwindcss: {
    exposeConfig: true
  }
});
