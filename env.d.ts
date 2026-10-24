/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_API_BASE_URL: string
  readonly PUBLIC_BASE_URL: string
  readonly PUBLIC_TOKEN_KEY: string
  readonly PUBLIC_GOOGLE_PLACES_API_KEY: string
  readonly PUBLIC_GOOGLE_PLACES_BUSINESS_ID: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
