/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string
  // আরও ভ্যারিয়েবল থাকলে এখানে দিন
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}