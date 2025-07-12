import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { User, Mail, Lock, Eye, EyeOff, Check } from 'lucide-react';
import './SignupPage.css';

const SignupPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validateForm = () => {
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const success = await signup(formData.name, formData.email, formData.password);
      if (success) {
        navigate('/dashboard');
      } else {
        setError('Failed to create account. Please try again.');
      }
    } catch (err) {
      setError('Signup failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const passwordRequirements = [
    { text: 'At least 6 characters', met: formData.password.length >= 6 },
    { text: 'Passwords match', met: formData.password === formData.confirmPassword && formData.confirmPassword !== '' }
  ];

  return (
    <div className="signup-page fade-in">
      <div className="signup-container">
        <div className="signup-form-section">
          <div className="signup-header">
            <h1>Join ReWear</h1>
            <p>Start your sustainable fashion journey today</p>
          </div>

          {error && (
            <div className="alert alert-error">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="signup-form">
            <div className="form-group">
              <label htmlFor="name" className="form-label">
                <User size={16} />
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="form-input"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email" className="form-label">
                <Mail size={16} />
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="form-input"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">
                <Lock size={16} />
                Password
              </label>
              <div className="password-input">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  className="form-input"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a password"
                  required
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword" className="form-label">
                <Lock size={16} />
                Confirm Password
              </label>
              <div className="password-input">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  name="confirmPassword"
                  className="form-input"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                  required
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {formData.password && (
              <div className="password-requirements">
                <h4>Password Requirements:</h4>
                <ul>
                  {passwordRequirements.map((req, index) => (
                    <li key={index} className={req.met ? 'met' : 'unmet'}>
                      <Check size={14} />
                      {req.text}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <button type="submit" className="btn btn-primary signup-btn" disabled={isLoading}>
              {isLoading ? <span className="loading"></span> : 'Create Account'}
            </button>
          </form>

          <div className="signup-footer">
            <p>Already have an account? <Link to="/login">Sign in here</Link></p>
          </div>

          <div className="welcome-bonus">
            <h4>🎉 Welcome Bonus</h4>
            <p>Get 50 points when you sign up to start swapping immediately!</p>
          </div>
        </div>

        <div className="signup-image-section">
          <img 
            src="https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=600" 
            alt="Sustainable Fashion Community"
          />
          <div className="image-overlay">
            <h3>Join 5,000+ Members</h3>
            <p>Building a sustainable fashion future together</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;