import React from 'react'
import './userlist.css'
import UserDetails from '../Userdetails/UserDetails'
import { useSelector } from 'react-redux'
import { IRootState } from '../../interface'

const Userlist = () => {
    const userlist = useSelector((state:IRootState) => state.userDetails);

    return (
        <>
            <table className="table userTable">
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Status</th>
                        <th scope="col">Access</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {userlist.map((user) => (
                        <UserDetails key={user.id} user={user} />
                    ))}
                </tbody>
            </table>
        </>

    )
}

export default Userlist