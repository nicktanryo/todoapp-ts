import * as Yup from "yup"

export const loginValidation = Yup.object({
    username: Yup.string().required("Required"),
    password: Yup.string().required("Required"),
})

export const registerValidation = Yup.object({
    username: Yup.string().required("Required"),
    password: Yup.string().required("Required"),
    confirmPassword: Yup.string().oneOf([Yup.ref("password"), undefined, ""], "Password Must match"),
    email: Yup.string().email().required("Required"),
    fName: Yup.string().required("Required"),
    lName: Yup.string().required("Required")
})