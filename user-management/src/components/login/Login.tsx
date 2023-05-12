import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

type Props = {}

const Login = (props: Props) => {
    const Navigate = useNavigate()
    return (
        <div className='flex bg-white rounded-xl mx-2 h=[40vh]  md:w-[70vh] drop-shadow-2xl'>
            <div className='w-1/2 bg-[#005ae6] rounded-l-xl  hidden md:flex'>
                <div className=' px-4 py-7'>
                    <p className='text-4xl font-bold text-white ms-3'>Login</p>
                    <div className='w-11/12'>
                        <img src="/img/Login/login.jpg" alt="" />
                    </div>
                </div>
            </div>
            <div className='w-full md:w-1/2 bg-[#fffff] p-5 flex justify-center items-center'>
                <form action="">
                    <div className="inputGroup py-2">

                        <p>Email</p>
                        <div className='flex py-1 px-4 rounded-full border-2 bg-blue-100'>
                            <img className='w-5' src="/img/Login/email.svg" alt="" />
                            <input type="text" className='ms-2 bg-inherit w-11/12 outline-0 ' placeholder='Enter Email' />
                        </div>
                    </div>
                    <div className="inputGroup py-2">
                        <p>Password</p>
                        <div className='flex py-1 px-4 rounded-full border-2 bg-blue-100'>
                            <img className='w-5' src="/img/Login/lock.svg" alt="" />
                            <input type="text" className='ms-2 bg-inherit w-11/12 outline-0 ' placeholder='Enter Password' />
                        </div>
                    </div>
                    <div className="submitSec w-full flex justify-center mt-7">
                        <button type="button" className='py-2 px-8 bg-[#005ae6] rounded-md text-white hover:bg-black ' onClick={() => Navigate("/Dashboard")}>Login</button>
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