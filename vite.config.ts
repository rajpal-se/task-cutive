import { defineConfig, loadEnv } from "vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import babel from "@rolldown/plugin-babel";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), "");
    return {
        plugins: [react(), babel({ presets: [reactCompilerPreset()] })],
        server: {
            port: 5001,
            proxy: {
                "/api": {
                    target: env?.VITE_API_HOST_URL?.replace(/\/$/, ""),
                    changeOrigin: true,
                    secure: false,
                    rewrite: (path) => path.replace(/^\/api/, ""),
                },
            },
        },
    };
});
