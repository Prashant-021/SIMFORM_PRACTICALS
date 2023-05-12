import React from 'react'

type Props = {}

const Dashboard = (props: Props) => {
    return (
        <div className='lg:flex w-full'>
            <div className="lg:w-1/5 h-[50vh] lg:h-[100vh] bg-[#005ae6] flex items-center relative">
                <div className="flex items-center justify-center lg:absolute rounded-full bg-yellow-300 h-80 w-80 right-auto bottom-0 lg:bottom-auto lg:-right-40 ">
                    Profile Image
                </div>
            </div>
            <div className="lg:w-4/5 h-[50vh] lg:h-[100vh] flex items-center justify-center">
                Information
            </div>
        </div>
    )
}

export default Dashboard