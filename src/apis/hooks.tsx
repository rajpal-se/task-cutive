import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import type {
    LoginFormValues,
    SignupFormValues,
    VerifyEmailFormValues,
} from "../schemas";
import { loginApi, signupApi, verifyEmailOtpApi } from "./services";

type SignupResponse = Awaited<ReturnType<typeof signupApi>>;
type LoginResponse = Awaited<ReturnType<typeof loginApi>>;
type VerifyEmailResponse = Awaited<ReturnType<typeof verifyEmailOtpApi>>;

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

export function useVerifyEmail(
    options?: UseMutationOptions<
        VerifyEmailResponse,
        Error,
        VerifyEmailFormValues
    >,
) {
    return useMutation<VerifyEmailResponse, Error, VerifyEmailFormValues>({
        mutationFn: verifyEmailOtpApi,
        ...options,
    });
}
