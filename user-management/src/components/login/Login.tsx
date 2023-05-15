import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import { LoginSchema } from '../../schema'
import { currentUser, RootState } from '../../interface'
import { useSelector } from 'react-redux'

type Props = {}


const initialValues: currentUser = {
    Email: '',
    password: ''
}
const Login = (props: Props) => {

    const [showPassword, setshowPassword] = useState<boolean>(false)
    const Navigate = useNavigate()
    const users = useSelector((state: RootState) => state.user?.userList); // Update the selector
    const { values, touched, errors, handleBlur, handleChange, handleSubmit, setFieldError } = useFormik({
        initialValues: initialValues,
        validationSchema: LoginSchema,
        onSubmit: (values: currentUser) => {
            console.log(values);
            const currentUser = users.find(user => values.Email === user.email)
            if (currentUser) {
                if (currentUser.password === values.password) {
                    Navigate('/dashboard', { state: { user: currentUser } })
                    sessionStorage.setItem("currentUser", values.Email)
                }
                else {
                    setFieldError('password', 'Wrong Password')
                }
            }
            else
                setFieldError('Email', 'User not found')
        }
    })
    return (
        <div className='flex bg-white rounded-xl mx-2 md:w-[100vh] drop-shadow-2xl'>
            <div className='w-1/2 bg-[#005ae6] rounded-l-xl  hidden md:flex'>
                <div className=' px-4 py-7'>
                    <p className='text-4xl font-bold text-white ms-3'>Login</p>
                    <div className='w-11/12'>
                        <img src="/img/Login/login.jpg" alt="" />
                    </div>
                </div>
            </div>
            <div className='w-full md:w-1/2 bg-[#fffff] p-5 flex justify-center items-center'>
                <form action="" onSubmit={handleSubmit}>
                    <div className="inputGroup py-2">

                        <p>Email</p>
                        <div className='flex py-1 px-4 relative rounded-full border-2 bg-blue-100'>
                            <img className='w-5' src="/img/Login/email.svg" alt="" />
                            <input name='Email' type="text" className='ms-2 bg-inherit w-11/12 outline-0 ' placeholder='Enter Email' value={values.Email} onChange={handleChange} onBlur={handleBlur}
                            />
                        </div>
                        {errors.Email && touched.Email ? (<p className='text-red-600 absolute'>{errors.Email}</p>) : null}
                    </div>
                    <div className="inputGroup pt-2 pb-3">
                        <p>Password</p>
                        <div className='flex py-1 px-4 relative rounded-full border-2 bg-blue-100'>
                            <img className='w-5' src="/img/Login/lock.svg" alt="" />
                            <input name='password' type={showPassword ? "text" : "password"} className='ms-2 bg-inherit w-11/12 outline-0 ' placeholder='Enter Password' value={values.password} onChange={handleChange} onBlur={handleBlur} />

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
                            <input type='checkbox' className='outline-0 hidden' name='togglePassword' >
                            </input>
                        </div>
                        {errors.password && touched.password ? (<p className='text-red-600 absolute'>{errors.password}</p>) : null}

                    </div>
                    <div className="submitSec w-full flex justify-center mt-7">
                        <button type="submit" className='py-2 px-8 bg-[#005ae6] rounded-md text-white hover:bg-black '>Login</button>
                    </div>
                    <div className="infoSec py-2 text-center">
                        <p>Don't have an account? <Link className='text-blue-500' to={'/Signup'}>Sign Up</Link></p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login