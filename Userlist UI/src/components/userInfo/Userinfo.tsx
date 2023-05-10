import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { mouseLeave } from '../../actions';
import { IRootState, IUser } from '../../interface'

import './userinfo.css'




const Userinfo = () => {
    const userProfileData = useSelector((state: IRootState) => state.userProfile);

    const progressValue = Math.random() * 100
    let user: IUser
    if (userProfileData.length === 0) {
        user = {
            id: 0,
            avatar: "No image available",
            firstName: "First Name",
            lastName: "Last Name",
            email: "No email available",
            clicksReviewed: "0",
            monthlyClicks: "0",
            isUserActive: false
        }
    } else {
        user = userProfileData[0].user
    }
    const dispatch = useDispatch()
    const closeInfoSection = () => {
        dispatch(mouseLeave(user))
    }



    if (userProfileData.length === 0) {
        return (<div className='d-none'></div>)
    } else {
        return (
            <div className='card bg-white'
                style={window.innerWidth < 950
                    ? {
                        position: "absolute",
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        top: '50%'
                    } : {
                        position: "absolute",
                        left: "65%",
                        top: "27%"
                    }
                }>
                <div className="cancelBtnSection">
                    <button className='cancelBtn' onClick={closeInfoSection}>X</button>
                </div>
                <div className="imgSection d-flex justify-content-center">
                    <img className='profileImage' src={user.avatar} alt="" />
                </div>
                <div className="card-body">
                    <div className="row ">
                        <div className="col-12 d-flex flex-column align-items-center">
                            <h5 className='m-0'>{`${user.firstName} ${user.lastName}`}</h5>
                            <p className='m-1 text-muted'>{user.email}</p>
                            <p className='mb-2'><strong>Your Plan: Standard</strong></p>
                        </div>
                        <div className="col-12 d-flex flex-column align-items-center">
                            <div className="btn userStatus border px-5 text-white">
                                <strong>Active User</strong>
                            </div>
                            <div className="col-12">
                                <p className='mt-2 m-0'>Plan Uses</p>
                                <div className="progressBar mt-2">
                                    <div className="usage medium" style={{ 'width': progressValue + '%' }}></div>
                                </div>
                            </div>
                            <div className="col-12 d-flex justify-content-evenly">
                                <div className="clickReview">
                                    <h4 className='m-0'>{user.clicksReviewed}</h4>
                                    <p className='subtitle'>Clicks reviewed</p>
                                </div>
                                <div className="separator"></div>
                                <div className="ms-3">
                                    <h4 className='m-0'>{user.monthlyClicks}</h4>
                                    <p className='subtitle'>Monthly clicks</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default Userinfo