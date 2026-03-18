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
        console.dir(error);
        throw new Error(
            error instanceof Error ? error.message : "Signup failed",
        );
    }
}
