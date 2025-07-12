import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Recycle, Users, Award, ChevronLeft, ChevronRight } from 'lucide-react';
import ItemCard from '../../components/ItemCard/ItemCard';
import './LandingPage.css';

const LandingPage: React.FC = () => {
  const featuredItems = [
    {
      id: '1',
      title: 'Vintage Denim Jacket',
      description: 'Classic 90s style denim jacket in excellent condition',
      price: 45,
      image: 'https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Outerwear',
      size: 'M',
      condition: 'Excellent',
      owner: 'Sarah M.'
    },
    {
      id: '2',
      title: 'Floral Summer Dress',
      description: 'Beautiful floral print dress perfect for summer',
      price: 30,
      image: 'https://images.pexels.com/photos/994517/pexels-photo-994517.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Dresses',
      size: 'S',
      condition: 'Good',
      owner: 'Emma K.'
    },
    {
      id: '3',
      title: 'Designer Handbag',
      description: 'Authentic leather handbag with minimal wear',
      price: 85,
      image: 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Accessories',
      size: 'One Size',
      condition: 'Excellent',
      owner: 'Lisa R.'
    }
  ];

  const stats = [
    { number: '10,000+', label: 'Items Exchanged' },
    { number: '5,000+', label: 'Active Members' },
    { number: '50,000+', label: 'Points Earned' },
    { number: '95%', label: 'Satisfaction Rate' }
  ];

  return (
    <div className="landing-page fade-in">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-background">
          <div className="hero-overlay"></div>
        </div>
        <div className="container hero-content">
          <div className="hero-text">
            <h1>Sustainable Fashion Starts Here</h1>
            <p>
              Join our community of eco-conscious fashion lovers. Exchange clothes, 
              earn points, and reduce textile waste while discovering unique pieces.
            </p>
            <div className="hero-buttons">
              <Link to="/signup" className="btn btn-primary btn-large">
                Start Swapping
                <ArrowRight size={20} />
              </Link>
              <Link to="/browse" className="btn btn-secondary btn-large">
                Browse Items
              </Link>
              <Link to="/add-item" className="btn btn-secondary btn-large">
                List an Item
              </Link>
            </div>
          </div>
          <div className="hero-image">
            <img 
              src="https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=600" 
              alt="Sustainable Fashion"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <h2>How ReWear Works</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <Users />
              </div>
              <h3>Join the Community</h3>
              <p>Sign up and become part of our sustainable fashion community</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <Recycle />
              </div>
              <h3>Exchange & Swap</h3>
              <p>List your unused clothes and swap them with others or redeem via points</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <Award />
              </div>
              <h3>Earn Rewards</h3>
              <p>Earn points for successful swaps and use them to get items you love</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Items */}
      <section className="featured-items">
        <div className="container">
          <div className="section-header">
            <h2>Featured Items</h2>
            <Link to="/browse" className="view-all-link">
              View All
              <ArrowRight size={16} />
            </Link>
          </div>
          <div className="items-carousel">
            <div className="items-grid">
              {featuredItems.map(item => (
                <ItemCard key={item.id} item={item} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats">
        <div className="container">
          <h2>Our Impact</h2>
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="stat-card">
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Start Your Sustainable Fashion Journey?</h2>
            <p>Join thousands of fashion lovers who are making a difference</p>
            <Link to="/signup" className="btn btn-primary btn-large">
              Get Started Today
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;