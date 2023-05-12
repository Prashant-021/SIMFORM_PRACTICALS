import * as yup from 'yup'

const phoneRegExp = /^[6-9]\d{9}$/;

export const SignUpSchema = yup.object().shape({
    name: yup.string().min(5).max(25).required("Please enter your name"),
    email: yup.string().email().required("Please enter your email"),
    phone: yup.string().matches(phoneRegExp, 'Invalid phone number').required("Please enter your phone number"),
    password: yup.string().min(6).required("Please enter your password"),
    confirmPassword: yup.string().required().oneOf([yup.ref('password')], "Password must match")
})