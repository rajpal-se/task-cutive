import { axiosInstance } from "../instance";

export async function loginApi(payload: { email: string; password: string }) {
    try {
        const response = await axiosInstance.post("/auth/login", payload);
        console.dir(22222, response);
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
