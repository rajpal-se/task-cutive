import { axiosInstance } from "../instance";

export async function signupApi(payload: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}) {
    try {
        const response = await axiosInstance.post("/users", payload);
        if (response.data.success === true) {
            return response.data;
        }
        throw new Error(response.data.message || "Signup failed");
    } catch (error) {
        throw new Error(
            error instanceof Error ? error.message : "Signup failed",
        );
    }
}

export async function getUserProfileApi() {
    try {
        const response = await axiosInstance.get(`/users`);
        if (response.data.success === true) {
            return response.data.data;
        }
        throw new Error(
            response.data.message || "Failed to fetch user profile",
        );
    } catch (error) {
        throw new Error(
            error instanceof Error
                ? error.message
                : "Failed to fetch user profile",
        );
    }
}

export async function updateUserProfileApi(payload: {
    firstName: string;
    lastName: string;
}) {
    try {
        const response = await axiosInstance.patch(`/users`, payload);
        const { success, data, message } = response?.data ?? {};

        if (success === true) {
            return {
                data,
                message,
            };
        }

        throw new Error(message || "Failed to update profile");
    } catch (error: any) {
        const response = error?.response || error?.cause?.response;
        const { message } = response?.data ?? {};

        throw new Error(
            error instanceof Error
                ? (message ?? error.message)
                : "Failed to update profile",
        );
    }
}
