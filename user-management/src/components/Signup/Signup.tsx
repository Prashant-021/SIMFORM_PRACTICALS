import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
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
    const users = useSelector((state: RootState) => state.user?.userList); // Update the selector

    const dispatch = useDispatch();
    const { values, touched, errors, handleBlur, handleChange, handleSubmit, setFieldValue } = useFormik({
        initialValues: initialValues,
        validationSchema: SignUpSchema,
        onSubmit: (values: User) => {
            dispatch(addUser(values));
        }
    });

    useEffect(() => {
        // const addedUser = users?.find((user) => user.email === values.email);
        // if (addedUser) {
        //   console.log('User added:', addedUser);
        // Perform additional actions if needed
        console.log('User added:', users);

    }, [users]);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.currentTarget.files?.[0];
        setFieldValue('profilepicture', file);
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

                            <input name='phone' type="number" className='ms-2 bg-inherit w-11/12 outline-0 ' placeholder='Enter Phone number' value={values.phone} onChange={handleChange} onBlur={handleBlur} />
                        </div>
                        {errors.phone && touched.phone ? (<p className='text-red-600 absolute'>{errors.phone}</p>) : null}
                    </div>
                    <div className="inputGroup pb-4 pt-4">
                        <p>Password</p>
                        <div className='flex py-1 px-4 rounded-full border-2 bg-blue-100'>
                            <img className='w-5' src="/img/Login/lock.svg" alt="" />
                            <input name='password' type="password" autoComplete="off" className='ms-2 bg-inherit w-11/12 outline-0 ' placeholder='Enter Password' value={values.password} onChange={handleChange} onBlur={handleBlur} />
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
                    </div>
                    <div className="infoSec py-2 text-center">
                        <p>Already have an account? <Link className='text-blue-500' to={'/Login'}>Login</Link></p>
                    </div>
                </form>
            </div>

        </div>
    )
}

export default Signup

