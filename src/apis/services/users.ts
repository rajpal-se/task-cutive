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
