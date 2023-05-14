import * as yup from 'yup'

const phoneRegExp = /^[6-9]\d{9}$/;

const validateFileSize = (value: File | null) => {
    if (!value) {
        return false;
    }
    return value.size <= 1048576; // Maximum file size: 1MB
};

const validateFileType = (value: File | null) => {
    if (!value) {
        return false;
    }
    return ['image/jpeg', 'image/png'].includes(value.type); // Allowed file types: JPEG and PNG
}
export const SignUpSchema = yup.object().shape({
    profilepicture: yup.mixed<File>().required('Image is required').test('fileSize', 'File size is too large', validateFileSize)
        .test('fileType', 'Invalid file type', validateFileType),
    name: yup.string().min(5).max(25).required("Please enter your name"),
    email: yup.string().email().required("Please enter your email"),
    phone: yup.string().matches(phoneRegExp, 'Invalid phone number').required("Please enter your phone number"),
    password: yup.string().min(6).required("Please enter your password"),
    confirmPassword: yup.string().required().oneOf([yup.ref('password')], "Password must match")
})

export const LoginSchema = yup.object().shape({
    Email: yup.string().email().required("Please enter your email"),
    password: yup.string().required("Please enter your password"),
})