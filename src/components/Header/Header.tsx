import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { User, Menu, X, ShoppingBag, Plus, LayoutDashboard, LogOut, Shield } from 'lucide-react';
import './Header.css';

const Header: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
      <div className="container header-content">
        <Link to="/" className="logo">
          <ShoppingBag className="logo-icon" />
          <span>ReWear</span>
        </Link>

        <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
          <Link to="/browse" onClick={() => setIsMenuOpen(false)}>Browse Items</Link>
          
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" onClick={() => setIsMenuOpen(false)}>
                <LayoutDashboard size={16} />
                Dashboard
              </Link>
              <Link to="/add-item" onClick={() => setIsMenuOpen(false)}>
                <Plus size={16} />
                Add Item
              </Link>
              {user?.role === 'admin' && (
                <Link to="/admin" onClick={() => setIsMenuOpen(false)}>
                  <Shield size={16} />
                  Admin
                </Link>
              )}
            </>
          ) : (
            <>
              <Link to="/login" onClick={() => setIsMenuOpen(false)}>Login</Link>
              <Link to="/signup" className="btn btn-primary" onClick={() => setIsMenuOpen(false)}>
                Sign Up
              </Link>
            </>
          )}
        </nav>

        {isAuthenticated && (
          <div className="user-menu">
            <div className="user-info">
              <User className="user-avatar" />
              <div className="user-details">
                <span className="user-name">{user?.name}</span>
                <span className="user-points">{user?.points} pts</span>
              </div>
            </div>
            <button onClick={handleLogout} className="logout-btn" title="Logout">
              <LogOut size={16} />
            </button>
          </div>
        )}

        <button className="menu-toggle" onClick={toggleMenu}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </header>
  );
};

export default Header;