import { faGripHorizontal } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, Outlet } from 'react-router-dom';
import auth from '../../firebase.init';
import useAdmin from '../../hooks/useAdmin';

const Dashboard = () => {
    const [user, loading, error] = useAuthState(auth);
    const [admin] = useAdmin(user);
    return (
        <div className="drawer drawer-mobile lg:w-full lg:mx-auto">
            <input id="dashboard-sidebar" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col lg:border">
                <label htmlFor="dashboard-sidebar" className="lg:hidden text-right mr-5 text-2xl text-primary">
                    <FontAwesomeIcon icon={faGripHorizontal} />
                </label>
                {/* Page content here  */}
                <Outlet />

            </div>
            <div className="drawer-side">
                <label htmlFor="dashboard-sidebar" className="drawer-overlay"></label>
                <ul className="menu p-2 overflow-y-auto w-44 md:w-48 bg-[#f4c1a6] font-bold">
                    {/* Sidebar content here  */}
                    <li className='border border-primary rounded'><Link to='/dashboard'>My Profile</Link></li>
                    {!admin && <>
                        <li className='border border-primary rounded'><Link to='/dashboard/addReview'>Add Review</Link></li>
                        <li className='border border-primary rounded'><Link to='/dashboard/myOrders'>My Orders</Link></li>
                    </>}
                    {
                        admin && <>
                            <li className='border border-primary rounded'><Link to='/dashboard/addProduct'>Add Product</Link></li>
                            <li className='border border-primary rounded'><Link to='/dashboard/manageProducts'>Manage products</Link></li>
                            <li className='border border-primary rounded'><Link to='/dashboard/ManageAllOrders'>Manage All Orders</Link></li>
                            <li className='border border-primary rounded'><Link to='/dashboard/makeAdmin'>Make Admin</Link></li>
                        </>
                    }
                </ul>

            </div>
        </div>
    );
};

export default Dashboard;