import React from 'react'
import { IUser } from '../../interface'

import './userinfo.css'

type Props = {
    user: IUser
}

const Userinfo = (props: Props) => {
    return (
        <div className='card bg-white'>
            <div className="imgSection d-flex justify-content-center">
                <img className='profileImage' src={props.user.avatar} alt="" />
            </div>
            <div className="card-body">
                <div className="row ">
                    <div className="col-12 d-flex flex-column align-items-center">
                        <h5 className='m-0'>{`${props.user.firstName} ${props.user.lastName}`}</h5>
                        <p className='m-1 text-muted'>{props.user.email}</p>
                        <p className='mb-2'><strong>Your Plan: Standard</strong></p>
                    </div>
                    <div className="col-12 d-flex flex-column align-items-center">
                        <div className="btn userStatus border px-5 text-white">
                            <strong>Active User</strong>
                        </div>
                        <div className="col-12">
                            <p className='mt-2 m-0'>Plan Uses</p>
                            <div className="progressBar mt-2">
                                <div className="usage medium" style={{ 'width': 50 + '%' }}></div>
                            </div>
                        </div>
                        <div className="col-12 d-flex justify-content-evenly">
                            <div className="clickReview">
                                <h4 className='m-0'>{props.user.clicksReviewed}</h4>
                                <p className='subtitle'>Clicks reviewed</p>
                            </div>
                            <div className="separator"></div>
                            <div className="ms-3">
                                <h4 className='m-0'>{props.user.monthlyClicks}</h4>
                                <p className='subtitle'>Monthly clicks</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Userinfo