import React from 'react'
import { IUser } from '../../interface'
import { useDispatch } from 'react-redux'
import { mouseEnter, mouseLeave } from '../../actions'



type Props = {
    user: IUser
}

const UserDetails = (props: Props) => {
    const dispatch = useDispatch()
    const handleMouseEnter = () => {
        dispatch(mouseEnter(props.user))
    }
    const handleMouseLeave = () => {
        dispatch(mouseLeave(props.user))
    }
    return (
        <tr>
            <td onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className='d-flex align-items-center'>
                <img className='profileImg me-2' src={props.user.avatar} alt="" />
                <div className="name">
                    <h5 className='m-0'>{`${props.user.firstName}  ${props.user.lastName}`}</h5>
                    <p className='m-0 text-muted'>{props.user.email}</p>
                </div>
            </td>
            <td className='textArea'>
                <select className="form-select selectOptions" aria-label="Default select example">
                    <option value="1">InActive</option>
                    <option value="2">Active</option>
                </select>
            </td>
            <td className='textArea'>
                <select className="form-select selectOptions" aria-label="Default select example">
                    <option value="1">Owner</option>
                    <option value="2">Manager</option>
                    <option value="3">Read</option>
                </select></td>
            <td className='text-center'><img className='pt-3' alt="empty" width="20" height="auto" src='/delete.png' /></td>
        </tr>
    )
}

export default UserDetails