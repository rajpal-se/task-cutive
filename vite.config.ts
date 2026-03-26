import { defineConfig, loadEnv } from "vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import babel from "@rolldown/plugin-babel";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), "");
    return {
        plugins: [react(), babel({ presets: [reactCompilerPreset()] })],
        server: {
            port: env?.VITE_DEV_SERVER_PORT
                ? parseInt(env.VITE_DEV_SERVER_PORT)
                : 5000,
            proxy: {
                "/api": {
                    target: env?.VITE_DEV_API_HOST_URL?.replace(/\/$/, ""),
                    changeOrigin: true,
                    secure: false,
                    rewrite: (path) => path.replace(/^\/api/, ""),
                },
            },
        },
    };
});
