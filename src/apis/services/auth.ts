import { axiosInstance } from "../instance";

export async function getRefreshAccessTokenApi() {
    try {
        const response = await axiosInstance.post("/auth/refresh-access-token");
        if (response.data.success === true) {
            return response.data;
        }
    } catch (error) {
        // console.error("Error refreshing access token:", error);
    }
    return null;
}

export async function loginApi(payload: { email: string; password: string }) {
    try {
        const response = await axiosInstance.post("/auth/login", payload);
        // console.log(22222, response);
        const { success, data, message } = response?.data ?? {};
        if (success === true) {
            return data;
        }
        throw new Error(message || "Login failed");
    } catch (error: any) {
        const response = error?.response || error?.cause?.response;
        const { success, message } = response?.data ?? {};
        const verifyMessage =
            "Email not verified. A verification OTP has been sent to your email.";
        if (success === false && message === verifyMessage) {
            return response?.data;
        }

        throw new Error(
            error instanceof Error
                ? (message ?? error?.message)
                : "Login failed",
        );
    }
}

export async function verifyEmailOtpApi(payload: {
    email: string;
    otp: string;
}) {
    try {
        const response = await axiosInstance.post("/auth/verify-otp", {
            ...payload,
            purpose: "verify-email",
        });
        const { success, data, message } = response?.data ?? {};

        if (success === true) {
            return {
                ...data,
                message,
            };
        }

        throw new Error(message || "Email verification failed");
    } catch (error: any) {
        const response = error?.response || error?.cause?.response;
        const { message } = response?.data ?? {};

        throw new Error(
            error instanceof Error
                ? (message ?? error?.message)
                : "Email verification failed",
        );
    }
}

export async function logoutApi() {
    try {
        const response = await axiosInstance.post("/auth/logout", {});
        const { success, message } = response?.data ?? {};

        if (success === true) {
            return response.data;
        }

        throw new Error(message || "Logout failed");
    } catch (error: any) {
        const response = error?.response || error?.cause?.response;
        const { message } = response?.data ?? {};

        throw new Error(
            error instanceof Error
                ? (message ?? error.message)
                : "Logout failed",
        );
    }
}
