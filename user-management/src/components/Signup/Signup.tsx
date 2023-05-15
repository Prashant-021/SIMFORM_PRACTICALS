import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { SignUpSchema } from '../../schema';
import { RootState, User } from '../../interface';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../redux/slice/slice';

type Props = {};



const initialValues: User = {
    profilepicture: null,
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
};

const Signup = (props: Props) => {
    const users = useSelector((state: RootState) => state.user?.userList);

    const [showPassword, setshowPassword] = useState<boolean>(false)
    const Navigate = useNavigate()

    const dispatch = useDispatch();
    const { values, touched, errors, handleBlur, handleChange, handleSubmit, setFieldValue, resetForm } = useFormik({
        initialValues: initialValues,
        validationSchema: SignUpSchema,
        onSubmit: (values: User) => {
            const userExists = users.find(user => user.name === values.name)
            if (!userExists) {
                dispatch(addUser(values));
                sessionStorage.setItem("currentUser", values.email)
                Navigate('/dashboard', { state: { user: values } })
            }
            else {
                alert("User Already Exists")
                resetForm()
            }

        }
    });

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.currentTarget.files?.[0];
        if (file) {
            const reader = new FileReader()

            reader.onload = (e: ProgressEvent<FileReader>) => {
                if (e.target) {
                    const imageUrl = e.target.result as string;
                    setFieldValue('profilepicture', imageUrl);
                }
            }
            reader.readAsDataURL(file)
        }
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "e" || event.key === "+" || event.key === "-") {
            event.preventDefault();
        }
    };


    return (
        <div className='flex bg-white rounded-xl mx-2 h=[40vh]  md:w-[100vh] drop-shadow-2xl'>
            <div className='w-1/2 bg-[#005ae6] rounded-l-xl  hidden md:flex'>
                <div className=' px-4 py-7 '>
                    <p className='text-4xl text-center font-bold text-white me-3'>SignUp</p>
                    <div className='w-11/12'>
                        <img src="/img/Login/login.jpg" alt="" />
                    </div>
                </div>
            </div>
            <div className='w-full md:w-1/2 bg-[#fffff] p-5 flex justify-center items-center'>
                <form action="" onSubmit={handleSubmit}>
                    <div className="inputGroup pt-4">
                        <p>Select Profile Picture</p>
                        <label className="block py-2 relative">
                            <input name='profilepicture' type="file" className="block w-full text-sm text-slate-500
                            file:mr-4 file:py-2 file:px-4
                            file:rounded-full file:border-0
                            file:text-sm file:font-semibold
                            file:bg-blue-50 file:text-[#005ae6]
                            hover:file:bg-violet-100
                        " accept="image/x-png,image/gif,image/jpeg"
                                onChange={handleFileChange}
                                onBlur={handleBlur}
                            />
                        </label>
                        {errors.profilepicture && touched.profilepicture ? (<p className='text-red-600 absolute'>{errors.profilepicture}</p>) : null}
                    </div>
                    <div className="inputGroup pb-4 pt-4">
                        <p>Username</p>
                        <div className='flex py-1 px-4 relative rounded-full border-2 bg-blue-100'>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
                            </svg>
                            <input name='name' type="text" className='ms-2 bg-inherit w-11/12 outline-0 ' placeholder='Enter Name' value={values.name} onChange={handleChange} onBlur={handleBlur} />
                        </div>
                        {errors.name && touched.name ? (<p className='text-red-600 absolute'>{errors.name}</p>) : null}
                    </div>
                    <div className="inputGroup pb-4 pt-4">
                        <p>Email</p>
                        <div className='flex py-1 px-4 rounded-full border-2 bg-blue-100'>
                            <img className='w-5' src="/img/Login/email.svg" alt="" />
                            <input name='email' type="email" className='ms-2 bg-inherit w-11/12 outline-0 ' placeholder='Enter Email' value={values.email} onChange={handleChange} onBlur={handleBlur} />
                        </div>
                        {errors.email && touched.email ? (<p className='text-red-600 absolute'>{errors.email}</p>) : null}
                    </div>
                    <div className="inputGroup pb-4 pt-4">
                        <p>Phone No.</p>
                        <div className='flex py-1 px-4 rounded-full border-2 bg-blue-100'>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                <path fillRule="evenodd" d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z" clipRule="evenodd" />
                            </svg>

                            <input name='phone' type="number" onKeyDown={handleKeyDown} className='ms-2 bg-inherit w-11/12 outline-0 ' placeholder='Enter Phone number' value={values.phone} onChange={handleChange} onBlur={handleBlur} />
                        </div>
                        {errors.phone && touched.phone ? (<p className='text-red-600 absolute'>{errors.phone}</p>) : null}
                    </div>
                    <div className="inputGroup pb-4 pt-4">
                        <p>Password</p>
                        <div className='flex py-1 px-4 rounded-full border-2 bg-blue-100'>
                            <img className='w-5' src="/img/Login/lock.svg" alt="" />
                            <input name='password' type={showPassword ? "text" : "password"} autoComplete="off" className='ms-2 bg-inherit w-11/12 outline-0 ' placeholder='Enter Password' value={values.password} onChange={handleChange} onBlur={handleBlur} />
                            <label htmlFor='togglePassword' onClick={() => { setshowPassword(prevshowPassword => !prevshowPassword) }}>
                                {showPassword ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                                    </svg>)}
                            </label>
                            <input type='checkbox' className='outline-0 hidden' name='togglePassword' />
                        </div>
                        {errors.password && touched.password ? (<p className='text-red-600 absolute'>{errors.password}</p>) : null}
                    </div>
                    <div className="inputGroup pb-4 pt-4">
                        <p>Confirm Password</p>
                        <div className='flex py-1 px-4 rounded-full border-2 bg-blue-100'>
                            <img className='w-5' src="/img/Login/lock.svg" alt="" />
                            <input name='confirmPassword' type="password" autoComplete="off" className='ms-2 bg-inherit w-11/12 outline-0 ' placeholder='Confirm Password' value={values.confirmPassword} onChange={handleChange} onBlur={handleBlur} />
                        </div>
                        {errors.confirmPassword && touched.confirmPassword ? (<p className='text-red-600 absolute'>{errors.confirmPassword}</p>) : null}
                    </div>

                    <div className="submitSec w-full flex justify-center mt-3">
                        <button type="submit" className='py-2 px-8 bg-[#005ae6] rounded-md text-white hover:bg-black '>Sign Up</button>
                        <button type="reset" className='bg-red-500 rounded-md ms-3 p-2 text-white' onClick={() => resetForm()}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                            </svg>
                        </button>
                    </div>
                    <div className="infoSec py-2 text-center">
                        <p>Already have an account? <Link className='text-blue-500' to={'/login'}>Login</Link></p>
                    </div>
                </form>
            </div>

        </div>
    )
}

export default Signup

