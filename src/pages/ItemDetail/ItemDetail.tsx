import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ArrowLeft, Heart, Share2, MapPin, Calendar, Tag, Ruler, CheckCircle, RefreshCw, Award, MessageCircle } from 'lucide-react';
import './ItemDetail.css';

const ItemDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [selectedImage, setSelectedImage] = useState(0);
  const [showSwapModal, setShowSwapModal] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);

  // Mock item data - in real app, fetch from API
  const item = {
    id: id,
    title: 'Vintage Denim Jacket',
    description: 'A beautiful vintage denim jacket from the 90s. This piece has been well-maintained and shows minimal signs of wear. Perfect for layering over any outfit. The classic blue wash and timeless design make it a versatile addition to any wardrobe. Features include button closure, chest pockets, and a comfortable relaxed fit.',
    price: 45,
    images: [
      'https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=600'
    ],
    category: 'Outerwear',
    size: 'M',
    condition: 'Excellent',
    brand: 'Levi\'s',
    tags: ['vintage', 'casual', 'layering', 'denim'],
    owner: {
      name: 'Sarah Martinez',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100',
      rating: 4.8,
      totalSwaps: 23,
      joinDate: 'March 2023'
    },
    uploadDate: '3 days ago',
    location: 'Downtown, Portland',
    status: 'available',
    views: 47,
    interested: 8
  };

  const handleSwapRequest = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    setShowSwapModal(true);
  };

  const handleRedeemPoints = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    if (user && user.points >= item.price) {
      // Handle points redemption
      alert('Item redeemed successfully!');
    } else {
      alert('Insufficient points. You need more points to redeem this item.');
    }
  };

  const handleShare = () => {
    navigator.share?.({
      title: item.title,
      text: item.description,
      url: window.location.href
    }).catch(() => {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    });
  };

  return (
    <div className="item-detail fade-in">
      <div className="container">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <ArrowLeft size={16} />
          Back to Browse
        </button>

        <div className="item-detail-content">
          {/* Image Gallery */}
          <div className="image-gallery">
            <div className="main-image">
              <img src={item.images[selectedImage]} alt={item.title} />
              <div className="image-actions">
                <button 
                  className={`favorite-btn ${isFavorited ? 'favorited' : ''}`}
                  onClick={() => setIsFavorited(!isFavorited)}
                >
                  <Heart size={20} fill={isFavorited ? 'currentColor' : 'none'} />
                </button>
                <button className="share-btn" onClick={handleShare}>
                  <Share2 size={20} />
                </button>
              </div>
            </div>
            <div className="image-thumbnails">
              {item.images.map((image, index) => (
                <button
                  key={index}
                  className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                  onClick={() => setSelectedImage(index)}
                >
                  <img src={image} alt={`${item.title} ${index + 1}`} />
                </button>
              ))}
            </div>
          </div>

          {/* Item Info */}
          <div className="item-info">
            <div className="item-header">
              <h1>{item.title}</h1>
              <div className="item-price">{item.price} pts</div>
            </div>

            <div className="item-meta">
              <div className="meta-item">
                <Tag size={16} />
                <span>{item.category}</span>
              </div>
              <div className="meta-item">
                <Ruler size={16} />
                <span>Size {item.size}</span>
              </div>
              <div className="meta-item">
                <CheckCircle size={16} />
                <span>{item.condition}</span>
              </div>
              <div className="meta-item">
                <Calendar size={16} />
                <span>{item.uploadDate}</span>
              </div>
            </div>

            <div className="item-description">
              <h3>Description</h3>
              <p>{item.description}</p>
            </div>

            <div className="item-tags">
              <h4>Tags</h4>
              <div className="tags-list">
                {item.tags.map((tag, index) => (
                  <span key={index} className="tag">{tag}</span>
                ))}
              </div>
            </div>

            <div className="item-details">
              <div className="detail-row">
                <span>Brand:</span>
                <span>{item.brand}</span>
              </div>
              <div className="detail-row">
                <span>Location:</span>
                <span>
                  <MapPin size={14} />
                  {item.location}
                </span>
              </div>
              <div className="detail-row">
                <span>Views:</span>
                <span>{item.views}</span>
              </div>
              <div className="detail-row">
                <span>Interested:</span>
                <span>{item.interested} people</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="action-buttons">
              <button className="btn btn-primary" onClick={handleSwapRequest}>
                <RefreshCw size={16} />
                Request Swap
              </button>
              <button 
                className="btn btn-secondary" 
                onClick={handleRedeemPoints}
                disabled={user && user.points < item.price}
              >
                <Award size={16} />
                Redeem ({item.price} pts)
              </button>
              <button className="btn btn-secondary">
                <MessageCircle size={16} />
                Message Owner
              </button>
            </div>

            {user && user.points < item.price && (
              <div className="alert alert-info">
                You need {item.price - user.points} more points to redeem this item.
              </div>
            )}
          </div>
        </div>

        {/* Owner Info */}
        <div className="owner-info">
          <h3>Listed by</h3>
          <div className="owner-card">
            <img src={item.owner.avatar} alt={item.owner.name} className="owner-avatar" />
            <div className="owner-details">
              <h4>{item.owner.name}</h4>
              <div className="owner-stats">
                <span>⭐ {item.owner.rating}/5</span>
                <span>• {item.owner.totalSwaps} swaps</span>
                <span>• Joined {item.owner.joinDate}</span>
              </div>
            </div>
            <button className="btn btn-secondary">View Profile</button>
          </div>
        </div>
      </div>

      {/* Swap Modal */}
      {showSwapModal && (
        <div className="modal-overlay" onClick={() => setShowSwapModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Request Item Swap</h3>
              <button onClick={() => setShowSwapModal(false)}>×</button>
            </div>
            <div className="modal-content">
              <p>Select items from your collection to offer in exchange:</p>
              {/* Mock user items - in real app, fetch user's items */}
              <div className="swap-items">
                <div className="swap-item">
                  <img src="https://images.pexels.com/photos/994517/pexels-photo-994517.jpeg?auto=compress&cs=tinysrgb&w=100" alt="My item" />
                  <span>Summer Floral Dress</span>
                  <input type="checkbox" />
                </div>
                <div className="swap-item">
                  <img src="https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=100" alt="My item" />
                  <span>Designer Handbag</span>
                  <input type="checkbox" />
                </div>
              </div>
              <div className="modal-actions">
                <button className="btn btn-secondary" onClick={() => setShowSwapModal(false)}>
                  Cancel
                </button>
                <button className="btn btn-primary">
                  Send Swap Request
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ItemDetail;