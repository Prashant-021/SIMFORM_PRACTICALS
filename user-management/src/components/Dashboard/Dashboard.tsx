import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { User } from '../../interface';

// import { getUser } from '../redux/slice/slice';

const Dashboard = () => {
    const location = useLocation();
    const user: User | undefined = location.state && location.state.user;
    console.log(user);
    const Navigate = useNavigate()
    const handleSubmit = () => {
        Navigate('/Login')
        sessionStorage.clear()
    }

    useEffect(() => {
        if (sessionStorage.length === 0) {
            Navigate('/Login')
        }
    }, [Navigate])

    return (
        user ? (<div className='lg:flex w-full'>
            <div className="lg:w-1/5 h-[50vh] lg:h-[100vh] bg-[#005ae6] flex items-center relative">
                <div className="flex items-center justify-center lg:absolute rounded-full bg-yellow-300 h-80 w-80 right-auto bottom-0 lg:bottom-auto lg:-right-40 ">
                    Profile Image
                </div>
            </div>
            <div className="lg:w-4/5 h-[50vh] lg:h-[100vh] flex flex-col items-center justify-center">
                <div className="heading">
                    <h1 className='text-blue-700'>Information</h1>
                </div>
                <div className="">
                    <h1 className=''>Name: {user.name}</h1>
                    <h1 className=''>email: {user.email}</h1>
                    <h1 className=''>phone: {user.phone}</h1>
                </div>
                <button className='' onClick={handleSubmit}>Logout</button>
            </div>
        </div>):
        <div>No user Avaliable</div>
    )
}
// const mapStateToProps = (state: RootState) => ({
//     user: getUser(state),
// });

// export default connect(mapStateToProps)(Dashboard);
export default Dashboard;