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

const passwordSchema = yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(
        /[!@#$%^&*(),.?":{}|<>]/,
        "Password must contain at least one special character",
    );

export const resetPasswordFormSchema = yup
    .object({
        email: yup
            .string()
            .trim()
            .email("Email must be valid")
            .required("Email is required"),
    })
    .required();

export const verifyResetPasswordFormSchema = yup
    .object({
        otp: yup
            .string()
            .trim()
            .required("OTP is required")
            .matches(/^\d{4,8}$/, "OTP must be between 4 and 8 digits"),
        newPassword: passwordSchema,
        confirmPassword: yup
            .string()
            .required("Confirm password is required")
            .oneOf([yup.ref("newPassword")], "Passwords must match"),
    })
    .required();

export type LoginFormValues = yup.InferType<typeof loginFormSchema>;
export type VerifyEmailFormValues = yup.InferType<typeof verifyEmailFormSchema>;
export type ResetPasswordFormValues = yup.InferType<
    typeof resetPasswordFormSchema
>;
export type VerifyResetPasswordFormValues = Omit<
    yup.InferType<typeof verifyResetPasswordFormSchema>,
    "confirmPassword"
>;
