import React, { useState } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import GuestFooter from '../guestLayout/GuestFooter';
import InstituteHeader from './InstituteHeader';

const InstituteLeftNavBar = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    };

    return (
        <div>
            <button className="toggle-btn" onClick={toggleSidebar}>
                {isCollapsed ? '☰' : '✖'}
            </button>
            <div className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
                <NavLink to="/institute/viewApplications">View Applications</NavLink>
            </div>
            <div className={`content ${isCollapsed ? 'collapsed' : ''}`}>
                <div className="GuestLayout">
                    <div className="GuestHeader">
                        <InstituteHeader />
                    </div>
                    <div className="Outlet">
                        <Outlet />
                    </div>
                    <div className="GuestFooter">
                        <GuestFooter />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default InstituteLeftNavBar;
