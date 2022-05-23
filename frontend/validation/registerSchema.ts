import * as yup from "yup";

export const registerSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  email: yup.string().email("Invalid Email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Minimum 6 characters")
    .max(100, "Maximum 100 characters")
    .required("Password is required"),
});
