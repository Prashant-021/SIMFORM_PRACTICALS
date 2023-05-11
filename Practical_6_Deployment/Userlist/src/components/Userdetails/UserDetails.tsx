import React, { useState, useEffect } from 'react'
import { IRootState, IUser } from '../../interface'
import { useDispatch, useSelector } from 'react-redux'
import { mouseClick, mouseLeave } from '../../actions'
import { addData } from '../../actions';
import './userDetails.css'


type Props = {
    user: IUser,
    index: number
}

const UserDetails = (props: Props) => {
    const userInformation = useSelector((state: IRootState) => state.userDetails)
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

    const handlechange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        userInformation[props.index].UserStatus = value
        dispatch(addData(userInformation))
    };
    return (
        <>
            <td className='d-flex align-items-center py-1' {...eventHandlers}>
                <img className='profileImg me-2' src={props.user.avatar} alt="" height={"40px"} width={"40px"} />
                <div className="name">
                    <h6 className='m-0'>{`${props.user.first_name}  ${props.user.last_name}`}</h6>
                    <p className='m-0 text-muted'>{props.user.email}</p>
                </div>
            </td>
            <td className='textArea py-1'>
                <select className="form-select selectOptions" onChange={handlechange} aria-label="Default select example">
                    <option value="InActive"><>InActive</></option>
                    <option value="Active">Active</option>
                </select>
            </td>
            <td className='textArea py-1'>
                <select className="form-select selectOptions" aria-label="Default select example">
                    <option value="1">Manager</option>
                    <option value="2">Employee</option>
                </select>
            </td>
        </ >
    )
}

export default UserDetails