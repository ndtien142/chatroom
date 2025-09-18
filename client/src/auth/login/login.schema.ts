import * as yup from "yup";

export const loginSchema = yup.object().shape({
  username: yup
    .string()
    .min(8, "Username must be at least 8 characters")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 8 characters")
    .required("Password is required"),
  remember: yup.boolean().default(false),
});
