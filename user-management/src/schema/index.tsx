import * as yup from 'yup'

const MAX_IMAGE_SIZE = 2 * 1024 * 1024;
const phoneRegExp = /^[6-9]\d{9}$/;

export const SignUpSchema = yup.object().shape({
    profilepicture: yup.string().required('Image is required').test('is-base64', 'Invalid image format', value => {
        if (!value) {
          return true;
        }
        const regex = /^data:image\/(png|jpe?g);base64,/i;
        return regex.test(value);
      }).test('is-size-valid', 'Image size exceeds the maximum allowed limit', value => {
        if (!value) {
            return true;
        }
        const bytes = Math.ceil((value.length - 'data:image/png;base64,'.length) * 0.75);
        return bytes <= MAX_IMAGE_SIZE;
    }),
    name: yup.string().min(5).max(25).required("Please enter your name"),
    email: yup.string().email().required("Please enter your email"),
    phone: yup.string().matches(phoneRegExp, 'Invalid phone number').required("Please enter your phone number"),
    password: yup.string().matches(
        /^(?=.*[A-Z])/,
        'must contain one uppercase letter'
      ).matches(
        /^(?=.*[!@#$%^&*])/,
        'must contain a special character'
      ).matches(
        /^(?=.*[0-9])/,
        'must contain at least one number'
      ).min(6).required("please enter your password"),
    confirmPassword: yup.string().required().oneOf([yup.ref('password')], "Password must match")
})

export const LoginSchema = yup.object().shape({
    Email: yup.string().email().required("Please enter your email"),
    password: yup.string().required("Please enter your password"),
})