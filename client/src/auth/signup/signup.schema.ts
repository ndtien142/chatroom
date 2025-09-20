import * as yup from "yup";

export const signupSchema = yup.object().shape({
  name: yup
    .string()
    .min(3, "Username must be at least 8 characters")
    .required("Name is required"),
  username: yup
    .string()
    .min(8, "Username must be at least 8 characters")
    .required("Username is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
});
