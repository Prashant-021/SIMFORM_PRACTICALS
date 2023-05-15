import React, { useLayoutEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { User } from '../../interface';


const Dashboard = () => {
    const location = useLocation();
    const user: User | undefined = location.state && location.state.user;
    console.log(user);
    const Navigate = useNavigate()
    const handleSubmit = () => {
        Navigate('/Login')
        sessionStorage.clear()
    }

    useLayoutEffect(() => {
        if (sessionStorage.length === 0) {
            Navigate('/Login')
        }
    }, [Navigate])

    return (
        user ? (<div className='lg:flex w-full'>
            <div className="lg:w-1/5 h-[50vh] lg:h-[100vh] bg-[#005ae6] flex items-center drop-shadow-2xl relative">
                <div className="overflow-hidden flex items-center justify-center lg:absolute rounded-full bg-yellow-300 h-80 w-80 right-auto bottom-0 lg:bottom-auto lg:-right-40 ">
                    <img src={user.profilepicture as string} alt="" className='h-[100%] w-[100%]' />
                </div>
            </div>
            <div className="lg:w-4/5 h-[50vh] lg:h-[100vh] flex flex-col items-center justify-center">
                <div className='border-transparent drop-shadow-2xl border-2 p-10 rounded-xl bg-white'>
                    <div className="heading mb-9">
                        <h1 className='text-blue-700 text-4xl'>Information</h1>
                        <br />
                    </div>
                    <div className="my-4">
                        <h1 className='text-2xl mb-2'><span className='font-bold'>Name: </span> {user.name}</h1>
                        <h1 className='text-2xl mb-2'><span className='font-bold'>Email: </span> {user.email}</h1>
                        <h1 className='text-2xl mb-2'><span className='font-bold'>Phone: </span> {user.phone}</h1>
                    </div>
                    <button className='py-2 mt-7 float-right px-8 bg-[#005ae6] rounded-md text-white hover:bg-black ' onClick={handleSubmit}>Logout</button>
                </div>
            </div>
        </div>) :
            <div>No user Avaliable</div>
    )
}
// const mapStateToProps = (state: RootState) => ({
//     user: getUser(state),
// });

// export default connect(mapStateToProps)(Dashboard);
export default Dashboard;