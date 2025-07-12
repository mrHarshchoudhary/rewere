import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Clock, Heart } from 'lucide-react';
import './ItemCard.css';

interface Item {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  category: string;
  size: string;
  condition: string;
  owner: string;
}

interface ItemCardProps {
  item: Item;
}

const ItemCard: React.FC<ItemCardProps> = ({ item }) => {
  return (
    <div className="item-card">
      <div className="item-image">
        <img src={item.image} alt={item.title} />
        <button className="favorite-btn">
          <Heart size={16} />
        </button>
        <div className="item-badge">{item.condition}</div>
      </div>
      
      <div className="item-content">
        <div className="item-header">
          <h3 className="item-title">{item.title}</h3>
          <div className="item-price">{item.price} pts</div>
        </div>
        
        <p className="item-description">{item.description}</p>
        
        <div className="item-details">
          <span className="item-category">{item.category}</span>
          <span className="item-size">Size {item.size}</span>
        </div>
        
        <div className="item-footer">
          <div className="item-owner">
            <MapPin size={14} />
            <span>by {item.owner}</span>
          </div>
          <div className="item-time">
            <Clock size={14} />
            <span>2 days ago</span>
          </div>
        </div>
        
        <Link to={`/item/${item.id}`} className="btn btn-primary item-btn">
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ItemCard;