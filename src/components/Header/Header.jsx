import React, { useContext } from 'react';
import { AuthContext } from '../../store/AuthProvider';
import { Link } from 'react-router-dom';

import './Header.scss';

export const Header = () => {
    const { authenticated, logOut } = useContext(AuthContext);

    return (
        <header className="header">
            <div className="container">
                <ul className="header-nav">
                    {authenticated && <li><Link to="/emp">Emp</Link></li>}
                    {authenticated && <li><Link to="/dept">Dept</Link></li>}
                    {authenticated && <li onClick={logOut}>Logout</li>}
                    {!authenticated && <li><Link to="/login">Login</Link> / <Link to="/registration">Signup</Link></li>}
                </ul>
            </div>
        </header>
    );
}

export default Header;