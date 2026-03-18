import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import type { SignupFormValues } from "../schemas";
import { signupApi } from "./services";

type SignupResponse = Awaited<ReturnType<typeof signupApi>>;

export function useSignup(
    options?: UseMutationOptions<SignupResponse, Error, SignupFormValues>,
) {
    return useMutation<SignupResponse, Error, SignupFormValues>({
        mutationFn: async (payload) => {
            const response = await signupApi(payload);

            if (!response) {
                throw new Error("Signup failed");
            }

            return response;
        },
        ...options,
    });
}
