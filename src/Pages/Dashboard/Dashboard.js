import { faGripHorizontal } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const Dashboard = () => {
    return (
        <div className="drawer drawer-mobile lg:w-3/4 lg:mx-auto">
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
                    <li className='border border-primary rounded'><Link to='/dashboard/addProduct'>Add product</Link></li>
                    <li className='border border-primary rounded'><Link to='/dashboard/makeAdmin'>Make Admin</Link></li>
                </ul>

            </div>
        </div>
    );
};

export default Dashboard;