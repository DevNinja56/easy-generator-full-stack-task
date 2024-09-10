import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

export const signUpFormSchema = yupResolver(
  Yup.object().shape({
    name: Yup.string().required("Name is Required *"),
    email: Yup.string()
      .required("Email is Required *")
      .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email address"),
    password: Yup.string()
      .required("Password is Required *")
      .min(8, "Password must be at least 8 characters long")
      .matches(/[a-zA-Z]/, "Password must contain at least one letter")
      .matches(/\d/, "Password must contain at least one number")
      .matches(
        /[@$!%*?&]/,
        "Password must contain at least one special character"
      ),
  })
);

export const signInFormSchema = yupResolver(
  Yup.object().shape({
    email: Yup.string()
      .required("Email is Required *")
      .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email address"),
    password: Yup.string()
      .required("Password is Required *")
      .min(8, "Password must be at least 8 characters long")
      .matches(/[a-zA-Z]/, "Password must contain at least one letter")
      .matches(/\d/, "Password must contain at least one number")
      .matches(
        /[@$!%*?&]/,
        "Password must contain at least one special character"
      ),
  })
);

export const editUserSchema = yupResolver(
  Yup.object().shape({
    name: Yup.string().required("Name is Required *"),
    email: Yup.string()
      .required("Email is Required *")
      .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email address"),
  })
);
