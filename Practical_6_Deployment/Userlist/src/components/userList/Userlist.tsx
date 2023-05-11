import React, { useEffect, useState } from 'react'
import './userlist.css'
import UserDetails from '../Userdetails/UserDetails'
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux'
import { IRootState } from '../../interface'
import { addData, deleteData } from '../../actions';

const Userlist = () => {
    const userlist = useSelector((state: IRootState) => state.userDetails);
    const [pageNo, setPageNo] = useState(1)
    const dispatch = useDispatch();
    useEffect(() => {
        const getData = async () => {
            const { data } = await axios.get(`${process.env.REACT_APP_API_URL}?page=${pageNo}`);        
            dispatch(addData(data.data))
        }
        getData()
    }, [pageNo, dispatch])

    const deleteUser = (userId: number)=> {
        dispatch(deleteData(userId)) 
    }

    return (
        <>
            <div className='tableDiv overflow-scroll'>
                <table className="table table-hover userTable">
                    <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Status</th>
                            <th scope="col">Access</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {userlist.map((user, index) => (
                            <tr  key={user.id} >
                                <UserDetails user={user} index = {index} />
                                <td className='text-center'>
                                    <button className='btn m-0 p-0' onClick={() => deleteUser(index)} >
                                        <img  alt="empty" width="20" height="auto" src='/delete.png' />
                                    </button>
                                </td>
                            </tr>

                        ))}
                    </tbody>
                </table>
            </div>
            <nav className='paginationSection' aria-label="Page navigation example ">
                <ul className="pagination pageNo">
                    <li className="page-item"><button className="page-link" onClick={() => setPageNo(1)}>1</button></li>
                    <li className="page-item"><button className="page-link" onClick={() => setPageNo(2)}>2</button></li>
                </ul>
            </nav>
        </>

    )
}

export default Userlist