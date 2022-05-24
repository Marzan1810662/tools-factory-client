import { signOut } from 'firebase/auth';
import React from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import auth from '../../firebase.init';
import LoadingSpinner from '../Shared/LoadingSpinner';

const MakeAdmin = () => {
    const navigate = useNavigate();
    const { data: users, isLoading, refetch } = useQuery('users',
        () => fetch('http://localhost:5000/user', {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => {
                if (res.status === 401 || res.status === 403) {
                    signOut(auth);
                    localStorage.removeItem('accessToken');
                    navigate('/login');
                }
                return res.json();
            })
    )
    if (isLoading) {
        return <LoadingSpinner />
    }

    const makeAdmin = (email) => {
        fetch(`http://localhost:5000/user/admin/${email}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
                'authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => {
                if (res.status === 403) {
                    Swal.fire({
                        icon: 'success',
                        text: `Forbidden Access! Not Admin.`
                    })
                    signOut(auth);
                    localStorage.removeItem('accessToken');
                }
                return res.json()
            })
            .then(data => {
                console.log(data);
                if (data.modifiedCount === 1) {
                    Swal.fire({
                        icon: 'success',
                        text: `${email} has been made an Admin!`
                    })
                }
                refetch();
            })
    }
    return (
        <div className='my-5'>
            <h1 className='text-2xl font-bold mb-5'>All Users</h1>
            <div className="overflow-x-auto">
                <table className="table w-full text-left">
                    <thead>
                        <tr className='text-xl'>
                            <th>No.</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users?.map((user, index) => <tr key={user._id} className='hover'>
                                <th>{++index}</th>
                                <td>{user?.name}</td>
                                <td>{user?.email}</td>
                                <td>
                                    {
                                        user?.role === 'admin'
                                            ?
                                            <p className='text-success font-bold'>Admin</p>
                                            :
                                            <button
                                                onClick={() => makeAdmin(user.email)} className='btn btn-sm btn-secondary btn-outline' >Make Admin</button>
                                    }
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MakeAdmin;