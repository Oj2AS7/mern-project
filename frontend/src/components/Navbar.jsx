import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-brand">
          <h1>BMI Calculator</h1>
        </div>
        
        {user && (
          <div className="nav-menu">
            <span className="nav-user">Welcome, {user.name}</span>
            <button onClick={logout} className="btn-secondary">
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
