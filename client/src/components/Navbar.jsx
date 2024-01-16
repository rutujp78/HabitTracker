import React, { useState } from 'react'
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './navbar.css';

const navlinks = [
    {
        title: "Home",
        link: "/",
    },
    {
        title: "About",
        link: "/about"
    },
    {
        title: "Login/Register",
        link: "/login",
    },
    {
        title: "Logout",
        link: "/logout",
    }
]

const Navbar = ({ isLoggedIn, myStorage, setCurrentUser, setCurrentToken, setUserID, setHabitID }) => {
    const [open, setOpen] = useState(false);
    const handleMenu = () => {
        setOpen((prev) => !prev);
    }

    const handleLogout = () => {
        myStorage.removeItem("username");
        myStorage.removeItem("token");
        myStorage.removeItem("habitID");
        myStorage.removeItem("userID");
        setCurrentUser(null);
        setCurrentToken(null);
        setUserID(null);
        setHabitID(null);
    }

    return (
        <div className='navbar-container'>
                    <div className="navbar-logo">
                        <a href="/ " className='text-white text-lg'>
                            HabitTracker
                        </a>
                    </div>
                    {/* Navlinks */}
                    <div className="navbar-pages-links">
                            {navlinks.map((link, index) => (
                                (isLoggedIn && (link.title === 'Logout' || link.title === "Home" || link.title === 'About') || (!isLoggedIn && (link.title === 'Login/Register' || link.title === 'About')) ? (
                                    <a
                                        key={index}
                                        className='navbar-pages-link'
                                        href={link.title === 'Logout' ? '/' : link.link}
                                        onClick={link.title === 'Logout' ? handleLogout : null}
                                    >
                                        {link.title}
                                    </a>
                                ) : null)
                            ))}
                    </div>
                    {/* hamburger button */}
                    <div className='-mr-2 flex md:hidden'>
                        <button
                            type="button" onClick={handleMenu}
                            className='inline-flex items-center jsutify-center p-2 rounded-md text-gray-400 hover:text-white hover:first-letter:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white'
                        >
                            <span className='sr-only'>Open Main Menu</span>
                            {open === true ? <FaTimes /> : <FaBars />}
                        </button>
                    </div>
            {/* for mobile screens */}
            {open ? (
                <div className='md:hidden'>
                    <div className='ox-2 pt-2 pb-3 space-y-1 sm:px-3'>
                        {navlinks.map((link, index) => (
                            (isLoggedIn && (link.title === 'Logout' || link.title === "Home" || link.title === 'About') || (!isLoggedIn && (link.title === 'Login/Register' || link.title === 'About')) ? (
                                <a
                                    key={index}
                                    className='text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium'
                                    href={link.title === 'Logout' ? '/' : link.link}
                                    onClick={link.title === 'Logout' ? handleLogout : null}
                                >
                                    {link.title}
                                </a>
                            ) : null)
                        ))}
                    </div>
                </div>
            ) : null}
        </div>
    )
}

Navbar.propTypes = {
    myStorage: PropTypes.any.isRequired,
}

export default Navbar