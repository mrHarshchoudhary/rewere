import React from 'react';
import { ShoppingBag, Mail, Github, Twitter } from 'lucide-react';
import './Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <div className="footer-logo">
              <ShoppingBag className="footer-logo-icon" />
              <span>ReWear</span>
            </div>
            <p className="footer-description">
              Promoting sustainable fashion through community-driven clothing exchanges. 
              Reduce waste, share style, build community.
            </p>
            <div className="social-links">
              <a href="#" aria-label="Email">
                <Mail size={20} />
              </a>
              <a href="#" aria-label="GitHub">
                <Github size={20} />
              </a>
              <a href="#" aria-label="Twitter">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          <div className="footer-section">
            <h4>Platform</h4>
            <ul>
              <li><a href="/browse">Browse Items</a></li>
              <li><a href="/add-item">List an Item</a></li>
              <li><a href="/dashboard">Dashboard</a></li>
              <li><a href="#">How It Works</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Community</h4>
            <ul>
              <li><a href="#">Guidelines</a></li>
              <li><a href="#">Safety Tips</a></li>
              <li><a href="#">Success Stories</a></li>
              <li><a href="#">Blog</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Support</h4>
            <ul>
              <li><a href="#">Help Center</a></li>
              <li><a href="#">Contact Us</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2025 ReWear. All rights reserved. Built for sustainable fashion.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;