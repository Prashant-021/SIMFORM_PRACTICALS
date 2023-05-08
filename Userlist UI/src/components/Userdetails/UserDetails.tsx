import React, { useEffect, useState } from 'react'
import { IUser } from '../../interface'
import { useDispatch } from 'react-redux'
import {  mouseClick, mouseLeave } from '../../actions'



type Props = {
    user: IUser
}

const UserDetails = (props: Props) => {
    const [isSmallscreen, setIsSmallscreen] = useState<boolean>(false)


    useEffect(() => {
        const handleResize = () => {
            setIsSmallscreen(window.innerWidth < 950)
        }
        handleResize()
        window.addEventListener('resize', handleResize)
        return () => {
            window.removeEventListener('resize', handleResize)
        }

    }, [])
    const dispatch = useDispatch()
    const handleMouseLeave = () => {
        dispatch(mouseLeave(props.user))
    }
    const handleMouseClick = () => {
        dispatch(mouseClick(props.user))
    }

    const eventHandlers = (isSmallscreen)
        ? { onClick: handleMouseClick }
        : { onMouseEnter: handleMouseClick, onMouseLeave: handleMouseLeave }

    return (
        <tr>
        <td className='d-flex align-items-center' {...eventHandlers}>    <img className='profileImg me-2' src={props.user.avatar} alt="" />
                <div className="name">
                    <h5 className='m-0'>{`${props.user.firstName}  ${props.user.lastName}`}</h5>
                    <p className='m-0 text-muted'>{props.user.email}</p>
                </div>
            </td>
            <td className='textArea'>
                {props.user.id === 1 ? <div className='text-success'>Active</div> :
                    <select className="form-select selectOptions" aria-label="Default select example">
                        <option value="1">InActive</option>
                        <option value="2">Active</option>
                    </select>}
            </td>
            <td className='textArea'>
                {props.user.id === 1 ? <div className='text-muted'>Owner</div> :
                    <select className="form-select selectOptions" aria-label="Default select example">
                        <option value="1">Manager</option>
                        <option value="2">Read</option>
                    </select>}
            </td>
            {props.user.id === 1?<td className='text-center'><img className='pt-3 ' alt="empty" width="20" height="auto" src='/lock.png' /></td>:
            <td className='text-center'><img className='pt-3' alt="empty" width="20" height="auto" src='/delete.png' /></td>}
        </tr >
    )
}

export default UserDetails

