import React, { useLayoutEffect } from 'react'
import { useSelector } from 'react-redux';
import {  useNavigate } from 'react-router-dom';
import { RootState } from '../../interface';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';


const Dashboard = () => {
    const users = useSelector((state: RootState) => state.user?.userList);
    const loggedInUser = sessionStorage.getItem('currentUser');
    const user = users.find(user => user.email === loggedInUser)
    const Navigate = useNavigate()
    const handleSubmit = () => {
        Navigate('/login')
        sessionStorage.clear()
    }

    useLayoutEffect(() => {
        if (sessionStorage.length === 0) {
            Navigate('/login')
        }
    }, [Navigate])

    return (

        user ? (
            <div className='w-full h-screen  flex flex-col '>
                <Header profileImg={user.profilepicture as string} />
                <div className='lg:flex flex-grow min-h-min '>
                    <div className="lg:w-1/5 py-3  bg-[#005ae6] flex items-center justify-center relative">
                        <div className="overflow-hidden flex items-center justify-center lg:absolute rounded-full  drop-shadow-2xl h-60 w-60 md:h-80 md:w-80 right-auto bottom-0 lg:bottom-auto lg:-right-40 ">
                            <img src={user.profilepicture as string} alt="" className='h-[100%] w-[100%]' />
                        </div>
                    </div>
                    <div className="lg:w-4/5 py-3 bg-[#e7f2fe] flex flex-col items-center justify-center">
                        <div className='border-transparent drop-shadow-2xl border-2 p-10 w-[90%] sm:w-[85%]  md:w-[50%] rounded-xl bg-white'>
                            <div className="heading mb-9">
                                <h1 className='text-black-700 text-4xl underline underline-offset-8 decoration-8 decoration-blue-400 dark:decoration-blue-600'>Information</h1>
                                <br />
                            </div>
                            <div className="my-4">
                                <h1 className='text-1xl mb-2'><span className='font-bold'>Name:  </span> {user.name}</h1>
                                <h1 className='text-1xl mb-2'><span className='font-bold'>Email: </span> {user.email}</h1>
                                <h1 className='text-1xl mb-2'><span className='font-bold'>Phone: </span> {user.phone}</h1>
                            </div>
                            <button className='py-2 mt-7 float-right px-8 bg-[#005ae6] rounded-md text-white hover:bg-black ' onClick={handleSubmit}>Logout</button>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        ) : <div>No user Avaliable</div>


    )
}
export default Dashboard;