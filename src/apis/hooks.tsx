import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import type { LoginFormValues, SignupFormValues } from "../schemas";
import { loginApi, signupApi } from "./services";

type SignupResponse = Awaited<ReturnType<typeof signupApi>>;
type LoginResponse = Awaited<ReturnType<typeof loginApi>>;

export function useLogin(
    options?: UseMutationOptions<LoginResponse, Error, LoginFormValues>,
) {
    return useMutation<LoginResponse, Error, LoginFormValues>({
        mutationFn: loginApi,
        ...options,
    });
}

export function useSignup(
    options?: UseMutationOptions<SignupResponse, Error, SignupFormValues>,
) {
    return useMutation<SignupResponse, Error, SignupFormValues>({
        mutationFn: signupApi,
        ...options,
    });
}
