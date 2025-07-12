// src/pages/Dashboard/Dashboard.tsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Plus, Package, RefreshCw, Award, TrendingUp, Clock, CheckCircle } from 'lucide-react';
import './Dashboard.css';

interface Item {
  _id: string;
  title: string;
  image?: string;
  status: string;
  views: number;
  interested: number;
  swappedWith?: string;
}

interface Swap {
  _id: string;
  type: string;
  item?: { title: string };
  points?: number;
  partner?: { name: string };
  date: string;
  status: string;
}

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [userItems, setUserItems] = useState<Item[]>([]);
  const [recentSwaps, setRecentSwaps] = useState<Swap[]>([]);
  const [stats, setStats] = useState([
    { label: 'Total Swaps', value: '0', icon: RefreshCw, color: '#48bb78' },
    { label: 'Items Listed', value: '0', icon: Package, color: '#3182ce' },
    { label: 'Current Points', value: user?.points.toString() || '0', icon: Award, color: '#ed8936' },
    { label: 'This Month', value: '0', icon: TrendingUp, color: '#9f7aea' }
  ]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('/api/dashboard', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch dashboard data');
        }

        const data = await response.json();

        setUserItems(data.items);
        setRecentSwaps(data.swaps);
        setStats([
          { label: 'Total Swaps', value: data.stats.totalSwaps.toString(), icon: RefreshCw, color: '#48bb78' },
          { label: 'Items Listed', value: data.stats.itemsListed.toString(), icon: Package, color: '#3182ce' },
          { label: 'Current Points', value: data.user.points.toString(), icon: Award, color: '#ed8936' },
          { label: 'This Month', value: data.stats.thisMonth.toString(), icon: TrendingUp, color: '#9f7aea' }
        ]);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchDashboardData();
    }
  }, [user]);

  if (loading) {
    return <div className="loading-spinner">Loading...</div>;
  }

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
                <div key={item._id} className="user-item-card">
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
                <div key={swap._id} className="activity-item">
                  <div className="activity-icon">
                    {swap.type === 'swap' ? 
                      <RefreshCw size={16} /> : 
                      <Award size={16} />
                    }
                  </div>
                  <div className="activity-content">
                    <div className="activity-main">
                      {swap.type === 'swap' ? (
                        <span>Swapped <strong>{swap.item?.title}</strong> with {swap.partner?.name}</span>
                      ) : (
                        <span>Redeemed <strong>{swap.item?.title}</strong> for {swap.points} points</span>
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