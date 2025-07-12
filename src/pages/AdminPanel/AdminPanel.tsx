import React, { useState } from 'react';
import { Check, X, Eye, AlertTriangle, Users, Package, TrendingUp, Clock } from 'lucide-react';
import './AdminPanel.css';

const AdminPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'pending' | 'reported' | 'users' | 'analytics'>('pending');

  const pendingItems = [
    {
      id: '1',
      title: 'Vintage Band T-Shirt',
      category: 'Tops',
      submittedBy: 'John Doe',
      submittedAt: '2 hours ago',
      image: 'https://images.pexels.com/photos/1018911/pexels-photo-1018911.jpeg?auto=compress&cs=tinysrgb&w=200',
      description: 'Authentic vintage band t-shirt from 1985 tour...',
      pointsValue: 35,
      condition: 'Good'
    },
    {
      id: '2',
      title: 'Designer Sunglasses',
      category: 'Accessories',
      submittedBy: 'Sarah Kim',
      submittedAt: '4 hours ago',
      image: 'https://images.pexels.com/photos/1229976/pexels-photo-1229976.jpeg?auto=compress&cs=tinysrgb&w=200',
      description: 'Ray-Ban sunglasses in excellent condition...',
      pointsValue: 65,
      condition: 'Excellent'
    },
    {
      id: '3',
      title: 'Leather Boots',
      category: 'Shoes',
      submittedBy: 'Mike Chen',
      submittedAt: '6 hours ago',
      image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=200',
      description: 'High-quality leather boots, barely worn...',
      pointsValue: 80,
      condition: 'Excellent'
    }
  ];

  const reportedItems = [
    {
      id: '1',
      title: 'Questionable Designer Bag',
      reportReason: 'Suspected counterfeit',
      reportedBy: 'Anonymous User',
      reportedAt: '1 day ago',
      image: 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=200',
      status: 'under_review'
    },
    {
      id: '2',
      title: 'Damaged Jacket',
      reportReason: 'Condition misrepresented',
      reportedBy: 'Jane Smith',
      reportedAt: '2 days ago',
      image: 'https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg?auto=compress&cs=tinysrgb&w=200',
      status: 'pending'
    }
  ];

  const userStats = [
    { label: 'Total Users', value: '1,247', icon: Users, change: '+12%' },
    { label: 'Active Items', value: '3,891', icon: Package, change: '+8%' },
    { label: 'Monthly Swaps', value: '456', icon: TrendingUp, change: '+23%' },
    { label: 'Pending Reviews', value: '23', icon: Clock, change: '-5%' }
  ];

  const handleApproveItem = (itemId: string) => {
    alert(`Item ${itemId} approved and published!`);
    // In real app, make API call to approve item
  };

  const handleRejectItem = (itemId: string) => {
    const reason = prompt('Please provide a reason for rejection:');
    if (reason) {
      alert(`Item ${itemId} rejected. Reason: ${reason}`);
      // In real app, make API call to reject item
    }
  };

  const handleResolveReport = (reportId: string, action: 'approve' | 'remove') => {
    if (action === 'remove') {
      alert(`Item removed due to report ${reportId}`);
    } else {
      alert(`Report ${reportId} dismissed - item approved`);
    }
    // In real app, make API call to resolve report
  };

  return (
    <div className="admin-panel fade-in">
      <div className="container">
        <div className="admin-header">
          <h1>Admin Panel</h1>
          <p>Manage platform content and monitor community activity</p>
        </div>

        {/* Quick Stats */}
        <div className="stats-grid">
          {userStats.map((stat, index) => (
            <div key={index} className="stat-card">
              <div className="stat-icon">
                <stat.icon size={24} />
              </div>
              <div className="stat-content">
                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
                <div className={`stat-change ${stat.change.startsWith('+') ? 'positive' : 'negative'}`}>
                  {stat.change} this month
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tab Navigation */}
        <div className="admin-tabs">
          <button
            className={`tab-btn ${activeTab === 'pending' ? 'active' : ''}`}
            onClick={() => setActiveTab('pending')}
          >
            <Package size={16} />
            Pending Items ({pendingItems.length})
          </button>
          <button
            className={`tab-btn ${activeTab === 'reported' ? 'active' : ''}`}
            onClick={() => setActiveTab('reported')}
          >
            <AlertTriangle size={16} />
            Reported Items ({reportedItems.length})
          </button>
          <button
            className={`tab-btn ${activeTab === 'users' ? 'active' : ''}`}
            onClick={() => setActiveTab('users')}
          >
            <Users size={16} />
            User Management
          </button>
          <button
            className={`tab-btn ${activeTab === 'analytics' ? 'active' : ''}`}
            onClick={() => setActiveTab('analytics')}
          >
            <TrendingUp size={16} />
            Analytics
          </button>
        </div>

        {/* Tab Content */}
        <div className="tab-content">
          {activeTab === 'pending' && (
            <div className="pending-items">
              <h2>Pending Item Approvals</h2>
              <div className="items-list">
                {pendingItems.map(item => (
                  <div key={item.id} className="admin-item-card">
                    <div className="item-image">
                      <img src={item.image} alt={item.title} />
                    </div>
                    <div className="item-details">
                      <div className="item-header">
                        <h3>{item.title}</h3>
                        <div className="item-meta">
                          <span className="category">{item.category}</span>
                          <span className="points">{item.pointsValue} pts</span>
                          <span className="condition">{item.condition}</span>
                        </div>
                      </div>
                      <p className="item-description">{item.description}</p>
                      <div className="submission-info">
                        <span>Submitted by <strong>{item.submittedBy}</strong></span>
                        <span>{item.submittedAt}</span>
                      </div>
                    </div>
                    <div className="item-actions">
                      <button className="btn-icon" title="View Details">
                        <Eye size={16} />
                      </button>
                      <button
                        className="btn-icon approve"
                        title="Approve"
                        onClick={() => handleApproveItem(item.id)}
                      >
                        <Check size={16} />
                      </button>
                      <button
                        className="btn-icon reject"
                        title="Reject"
                        onClick={() => handleRejectItem(item.id)}
                      >
                        <X size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'reported' && (
            <div className="reported-items">
              <h2>Reported Items</h2>
              <div className="items-list">
                {reportedItems.map(item => (
                  <div key={item.id} className="admin-item-card report">
                    <div className="item-image">
                      <img src={item.image} alt={item.title} />
                      <div className="report-badge">
                        <AlertTriangle size={14} />
                      </div>
                    </div>
                    <div className="item-details">
                      <div className="item-header">
                        <h3>{item.title}</h3>
                        <div className={`status-badge ${item.status}`}>
                          {item.status.replace('_', ' ')}
                        </div>
                      </div>
                      <div className="report-info">
                        <p><strong>Reason:</strong> {item.reportReason}</p>
                        <p><strong>Reported by:</strong> {item.reportedBy}</p>
                        <p><strong>Date:</strong> {item.reportedAt}</p>
                      </div>
                    </div>
                    <div className="item-actions">
                      <button className="btn-icon" title="View Details">
                        <Eye size={16} />
                      </button>
                      <button
                        className="btn-icon approve"
                        title="Dismiss Report"
                        onClick={() => handleResolveReport(item.id, 'approve')}
                      >
                        <Check size={16} />
                      </button>
                      <button
                        className="btn-icon reject"
                        title="Remove Item"
                        onClick={() => handleResolveReport(item.id, 'remove')}
                      >
                        <X size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'users' && (
            <div className="user-management">
              <h2>User Management</h2>
              <div className="management-placeholder">
                <Users size={48} />
                <h3>User Management Tools</h3>
                <p>View user profiles, manage suspensions, and monitor community guidelines compliance.</p>
                <button className="btn btn-primary">Coming Soon</button>
              </div>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="analytics">
              <h2>Platform Analytics</h2>
              <div className="analytics-placeholder">
                <TrendingUp size={48} />
                <h3>Advanced Analytics</h3>
                <p>Detailed insights into user engagement, swap patterns, and platform growth metrics.</p>
                <button className="btn btn-primary">Coming Soon</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;