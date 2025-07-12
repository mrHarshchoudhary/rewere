import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Plus, Package, RefreshCw, Award, TrendingUp, Clock, CheckCircle } from 'lucide-react';
import './Dashboard.css';

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  const userItems = [
    {
      id: '1',
      title: 'Summer Floral Dress',
      image: 'https://images.pexels.com/photos/994517/pexels-photo-994517.jpeg?auto=compress&cs=tinysrgb&w=300',
      status: 'active',
      views: 24,
      interested: 3
    },
    {
      id: '2',
      title: 'Vintage Leather Jacket',
      image: 'https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg?auto=compress&cs=tinysrgb&w=300',
      status: 'swapped',
      swappedWith: 'Designer Handbag'
    }
  ];

  const recentSwaps = [
    {
      id: '1',
      type: 'swap',
      item: 'Blue Denim Jeans',
      partner: 'Alex Chen',
      date: '2 days ago',
      status: 'completed'
    },
    {
      id: '2',
      type: 'redeem',
      item: 'Silk Scarf',
      points: 45,
      date: '1 week ago',
      status: 'completed'
    },
    {
      id: '3',
      type: 'swap',
      item: 'Winter Coat',
      partner: 'Sarah Kim',
      date: '2 weeks ago',
      status: 'pending'
    }
  ];

  const stats = [
    { label: 'Total Swaps', value: '12', icon: RefreshCw, color: '#48bb78' },
    { label: 'Items Listed', value: '8', icon: Package, color: '#3182ce' },
    { label: 'Current Points', value: user?.points.toString() || '0', icon: Award, color: '#ed8936' },
    { label: 'This Month', value: '5', icon: TrendingUp, color: '#9f7aea' }
  ];

  return (
    <div className="dashboard fade-in">
      <div className="container">
        <div className="dashboard-header">
          <div className="welcome-section">
            <h1>Welcome back, {user?.name}!</h1>
            <p>Ready to swap some amazing finds today?</p>
          </div>
          <Link to="/add-item" className="btn btn-primary">
            <Plus size={16} />
            List New Item
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="stat-card">
              <div className="stat-icon" style={{ backgroundColor: `${stat.color}20`, color: stat.color }}>
                <stat.icon size={24} />
              </div>
              <div className="stat-content">
                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="dashboard-content">
          {/* My Items */}
          <div className="dashboard-section">
            <div className="section-header">
              <h2>My Items</h2>
              <Link to="/add-item" className="btn btn-secondary">Add Item</Link>
            </div>
            <div className="items-grid">
              {userItems.map(item => (
                <div key={item.id} className="user-item-card">
                  <div className="item-image">
                    <img src={item.image} alt={item.title} />
                    <div className={`status-badge ${item.status}`}>
                      {item.status === 'active' ? 'Active' : 'Swapped'}
                    </div>
                  </div>
                  <div className="item-content">
                    <h3>{item.title}</h3>
                    {item.status === 'active' ? (
                      <div className="item-stats">
                        <span>{item.views} views</span>
                        <span>{item.interested} interested</span>
                      </div>
                    ) : (
                      <p className="swap-info">Swapped for: {item.swappedWith}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="dashboard-section">
            <div className="section-header">
              <h2>Recent Activity</h2>
              <Link to="#" className="view-all">View All</Link>
            </div>
            <div className="activity-list">
              {recentSwaps.map(swap => (
                <div key={swap.id} className="activity-item">
                  <div className="activity-icon">
                    {swap.type === 'swap' ? 
                      <RefreshCw size={16} /> : 
                      <Award size={16} />
                    }
                  </div>
                  <div className="activity-content">
                    <div className="activity-main">
                      {swap.type === 'swap' ? (
                        <span>Swapped <strong>{swap.item}</strong> with {swap.partner}</span>
                      ) : (
                        <span>Redeemed <strong>{swap.item}</strong> for {swap.points} points</span>
                      )}
                    </div>
                    <div className="activity-meta">
                      <Clock size={12} />
                      <span>{swap.date}</span>
                      <div className={`activity-status ${swap.status}`}>
                        {swap.status === 'completed' ? <CheckCircle size={12} /> : <Clock size={12} />}
                        {swap.status}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;