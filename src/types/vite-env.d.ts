/// <reference types="vite/client" />
interface ViteTypeOptions {
    strictImportMetaEnv: unknown;
}

interface ImportMetaEnv {
    readonly VITE_DEV_SERVER_PORT: string;
    readonly VITE_DEV_API_HOST_URL: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
