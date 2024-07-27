import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ role }) => {
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login'; // Redirect to login
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand" to="/">Task Management App</Link>
        <div className="collapse navbar-collapse" style={{flex : "none"}}>
          <ul className="navbar-nav ">
            {role && (
              <>
                {role === 'admin' && <>
                    <li className="nav-item"><Link className="nav-link" to="/admin">Admin</Link></li>
                    <li className="nav-item"><Link className="nav-link" to="/dashboard">Dashboard</Link></li>
                </>
                }
                {role === 'user' && <>
                    <li className="nav-item"  style={{
    padding: "2px 10px",
    fontSize: 'larger'
}}>user</li>
                </>
                }
               
                <li className="nav-item">
                  <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
