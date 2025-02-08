import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const token = localStorage.getItem('token');  
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token'); // Remove token
        navigate('/'); // Redirect to homepage
        window.location.reload(); // Refresh to reflect logout
    };

    return (
        <header className="bg-blue-600 text-white p-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-lg font-bold"><Link to='/'>Event MP</Link></div>

                {/* Mobile Menu Button */}
                <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>

                {/* Navigation */}
                <nav className={`md:flex md:items-center md:space-x-6 absolute md:relative bg-blue-600 w-full md:w-auto left-0 top-16 md:top-0 p-4 md:p-0 transition-all duration-300 ${isOpen ? 'block' : 'hidden'}`}>
                    <Link to="/" className="block md:inline-block p-2 hover:bg-blue-700 rounded">Home</Link>

                    {/* Show "Create" and "Dashboard" only if logged in */}
                    {token && (
                        <>
                            <Link to="/create" className="block md:inline-block p-2 hover:bg-blue-700 rounded">Create</Link>
                            <Link to="/dashboard" className="block md:inline-block p-2 hover:bg-blue-700 rounded">Dashboard</Link>
                        </>
                    )}

                    {/* Show "Sign In" if not logged in, otherwise show "Logout" */}
                    {token ? (
                        <button onClick={handleLogout} className="block md:inline-block p-2 bg-red-500 hover:bg-red-600 rounded">
                            Logout
                        </button>
                    ) : (
                        <Link to="/login" className="block md:inline-block p-2 hover:bg-blue-700 rounded">Sign In</Link>
                    )}
                </nav>
            </div>
        </header>
    );
};

export default Header;
