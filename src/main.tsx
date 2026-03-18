import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.module.scss";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { RouterProvider } from "react-router";
import router from "./router";
import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "./theme";
import { Provider } from "react-redux";
import { store } from "./store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <Provider store={store}>
            <QueryClientProvider client={queryClient}>
                <CssBaseline />
                <ThemeProvider theme={theme}>
                    <RouterProvider router={router} />
                </ThemeProvider>
                <Toaster
                    position="bottom-center"
                    richColors
                    closeButton
                    duration={2500}
                />
            </QueryClientProvider>
        </Provider>
    </StrictMode>,
);
