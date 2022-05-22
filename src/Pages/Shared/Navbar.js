import React from 'react';
import logo from '../../images/logo.png';

const Navbar = () => {
    return (
        <div>
            <div className="navbar bg-base-100 w-full lg:w-3/4 lg:mx-auto ">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex="0" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex="0" className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-36">
                            <li><a>Blogs</a></li>
                            <li><a>My Portfolio</a></li>
                            <li><a>Dashnboard</a></li>
                            <li tabIndex="0">
                                <a className="justify-between">
                                    Profile
                                    <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" /></svg>
                                </a>
                                <ul className="p-2">
                                    <li><a>Logout</a></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                    <a className="hidden lg:flex items-center">
                        <img className='md:w-2/12 mr-2 rounded-full' src={logo} alt="Logo" />
                        <h1 className=' lg:text-4xl font-bold'>Tools Factory</h1>
                    </a>
                </div>
                <div className="navbar-center lg:flex">
                <a className="flex items-center justify-center lg:hidden">
                        <img className='w-14 md:w-2/12 mr-2 rounded-full' src={logo} alt="Logo" />
                        <h1 className='text-xl md:text-4xl font-bold'>Tools Factory</h1>
                    </a>
                    <ul className="hidden lg:menu lg:menu-horizontal p-0 font-bold">
                        <li><a>Blogs</a></li>
                        <li><a>My Portfolio</a></li>
                        <li><a>Dashboard</a></li>
                    </ul>
                </div>
                <div className="navbar-end">
                    <a className="hidden lg:btn">Log In</a>
{/*                     <div className="dropdown dropdown-hover hidden lg:block">
                        <label tabIndex="0" className="btn m-1">Profile Profile Profile</label>
                        <ul tabIndex="0" className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                            <li><a>Item 1</a></li>
                            <li><a>Item 2</a></li>
                        </ul>
                    </div> */}
                </div>
            </div>
        </div>
    );
};

export default Navbar;