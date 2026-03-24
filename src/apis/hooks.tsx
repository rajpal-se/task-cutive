import {
    useMutation,
    useQuery,
    type UseMutationOptions,
    type UseQueryOptions,
} from "@tanstack/react-query";
import type {
    LoginFormValues,
    ResetPasswordFormValues,
    SignupFormValues,
    VerifyEmailFormValues,
} from "../schemas";
import {
    createTaskApi,
    getAllTasksApi,
    getTaskByIdApi,
    loginApi,
    logoutApi,
    resetPasswordApi,
    signupApi,
    updateTaskApi,
    verifyEmailOtpApi,
    verifyResetPasswordOtpApi,
} from "./services";

type SignupResponse = Awaited<ReturnType<typeof signupApi>>;
type LoginResponse = Awaited<ReturnType<typeof loginApi>>;
type VerifyEmailResponse = Awaited<ReturnType<typeof verifyEmailOtpApi>>;
type ResetPasswordResponse = Awaited<ReturnType<typeof resetPasswordApi>>;
type VerifyResetPasswordResponse = Awaited<
    ReturnType<typeof verifyResetPasswordOtpApi>
>;
type VerifyResetPasswordVariables = Parameters<
    typeof verifyResetPasswordOtpApi
>[0];
type LogoutResponse = Awaited<ReturnType<typeof logoutApi>>;
type CreateTaskResponse = Awaited<ReturnType<typeof createTaskApi>>;
type UpdateTaskResponse = Awaited<ReturnType<typeof updateTaskApi>>;
type TaskByIdResponse = Awaited<ReturnType<typeof getTaskByIdApi>>;
type TasksListResponse = Awaited<ReturnType<typeof getAllTasksApi>>;

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

export function useResetPassword(
    options?: UseMutationOptions<
        ResetPasswordResponse,
        Error,
        ResetPasswordFormValues
    >,
) {
    return useMutation<ResetPasswordResponse, Error, ResetPasswordFormValues>({
        mutationFn: resetPasswordApi,
        ...options,
    });
}

export function useVerifyResetPasswordOtp(
    options?: UseMutationOptions<
        VerifyResetPasswordResponse,
        Error,
        VerifyResetPasswordVariables
    >,
) {
    return useMutation<
        VerifyResetPasswordResponse,
        Error,
        VerifyResetPasswordVariables
    >({
        mutationFn: verifyResetPasswordOtpApi,
        ...options,
    });
}

export function useLogout(
    options?: UseMutationOptions<LogoutResponse, Error, void>,
) {
    return useMutation<LogoutResponse, Error, void>({
        mutationFn: logoutApi,
        ...options,
    });
}

export function useCreateTask(
    options?: UseMutationOptions<
        CreateTaskResponse,
        Error,
        Parameters<typeof createTaskApi>[0]
    >,
) {
    return useMutation<
        CreateTaskResponse,
        Error,
        Parameters<typeof createTaskApi>[0]
    >({
        mutationFn: createTaskApi,
        ...options,
    });
}

export function useUpdateTask(
    options?: UseMutationOptions<
        UpdateTaskResponse,
        Error,
        Parameters<typeof updateTaskApi>[0]
    >,
) {
    return useMutation<
        UpdateTaskResponse,
        Error,
        Parameters<typeof updateTaskApi>[0]
    >({
        mutationFn: updateTaskApi,
        ...options,
    });
}

export function useTaskById(
    taskId: string,
    options?: Omit<
        UseQueryOptions<TaskByIdResponse, Error>,
        "queryKey" | "queryFn"
    >,
) {
    return useQuery<TaskByIdResponse, Error>({
        queryKey: ["task", taskId],
        queryFn: () => getTaskByIdApi(taskId),
        enabled: Boolean(taskId),
        ...options,
    });
}

export function useTasks(
    params?: Parameters<typeof getAllTasksApi>[0],
    options?: Omit<
        UseQueryOptions<TasksListResponse, Error>,
        "queryKey" | "queryFn"
    >,
) {
    const filter = params?.filter ?? "recent";
    const page = params?.page ?? 1;
    const perPage = params?.perPage ?? 20;

    return useQuery<TasksListResponse, Error>({
        queryKey: ["tasks", filter, page, perPage],
        queryFn: () => getAllTasksApi({ filter, page, perPage }),
        ...options,
    });
}
