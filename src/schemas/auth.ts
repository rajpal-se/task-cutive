import * as yup from "yup";

export const loginFormSchema = yup
    .object({
        email: yup
            .string()
            .trim()
            .email("Email must be valid")
            .required("Email is required"),
        password: yup.string().required("Password is required"),
    })
    .required();

export const verifyEmailFormSchema = yup
    .object({
        email: yup
            .string()
            .trim()
            .email("Email must be valid")
            .required("Email is required"),
        otp: yup
            .string()
            .trim()
            .required("OTP is required")
            .matches(/^\d{4,8}$/, "OTP must be between 4 and 8 digits"),
    })
    .required();

export type LoginFormValues = yup.InferType<typeof loginFormSchema>;
export type VerifyEmailFormValues = yup.InferType<typeof verifyEmailFormSchema>;
