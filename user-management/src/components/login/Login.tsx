import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import { LoginSchema } from '../../schema'
import { currentUser, RootState, User } from '../../interface'
import { useSelector } from 'react-redux'

type Props = {}


const initialValues: currentUser = {
    Email: '',
    password: ''
}
const Login = (props: Props) => {
    const Navigate = useNavigate()
    const users = useSelector((state: RootState) => state.user?.userList); // Update the selector
    const { values, touched, errors, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: initialValues,
        validationSchema: LoginSchema,
        onSubmit: (values: currentUser) => {
            console.log(values);
            if(users.find((user: User) => user.email === values.Email && user.password === values.password )) 
                Navigate('/dashboard')
            else
                alert("Invalid username or password")
        }
    })
    return (
        <div className='flex bg-white rounded-xl mx-2   md:w-[100vh] drop-shadow-2xl'>
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
                            <input name='password' type="password" className='ms-2 bg-inherit w-11/12 outline-0 ' placeholder='Enter Password' value={values.password} onChange={handleChange} onBlur={handleBlur} />
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