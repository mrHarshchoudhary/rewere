import React, { useState } from 'react';
import { Search, Filter, Grid, List } from 'lucide-react';
import ItemCard from '../../components/ItemCard/ItemCard';
import './BrowseItems.css';

const BrowseItems: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSize, setSelectedSize] = useState('all');
  const [selectedCondition, setSelectedCondition] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);

  const categories = ['all', 'tops', 'bottoms', 'dresses', 'outerwear', 'shoes', 'accessories'];
  const sizes = ['all', 'XS', 'S', 'M', 'L', 'XL', 'XXL'];
  const conditions = ['all', 'excellent', 'good', 'fair'];

  const mockItems = [
    {
      id: '1',
      title: 'Vintage Denim Jacket',
      description: 'Classic 90s style denim jacket in excellent condition',
      price: 45,
      image: 'https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'outerwear',
      size: 'M',
      condition: 'excellent',
      owner: 'Sarah M.'
    },
    {
      id: '2',
      title: 'Floral Summer Dress',
      description: 'Beautiful floral print dress perfect for summer',
      price: 30,
      image: 'https://images.pexels.com/photos/994517/pexels-photo-994517.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'dresses',
      size: 'S',
      condition: 'good',
      owner: 'Emma K.'
    },
    {
      id: '3',
      title: 'Designer Handbag',
      description: 'Authentic leather handbag with minimal wear',
      price: 85,
      image: 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'accessories',
      size: 'One Size',
      condition: 'excellent',
      owner: 'Lisa R.'
    },
    {
      id: '4',
      title: 'Casual White Sneakers',
      description: 'Clean white sneakers in great condition',
      price: 40,
      image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'shoes',
      size: '8',
      condition: 'good',
      owner: 'Mike T.'
    },
    {
      id: '5',
      title: 'Silk Blouse',
      description: 'Elegant silk blouse for professional wear',
      price: 35,
      image: 'https://images.pexels.com/photos/1018911/pexels-photo-1018911.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'tops',
      size: 'M',
      condition: 'excellent',
      owner: 'Anna L.'
    },
    {
      id: '6',
      title: 'High-Waisted Jeans',
      description: 'Trendy high-waisted jeans in dark wash',
      price: 25,
      image: 'https://images.pexels.com/photos/1895943/pexels-photo-1895943.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'bottoms',
      size: 'L',
      condition: 'good',
      owner: 'Jessica P.'
    }
  ];

  const filteredItems = mockItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSize = selectedSize === 'all' || item.size === selectedSize;
    const matchesCondition = selectedCondition === 'all' || item.condition === selectedCondition;
    
    return matchesSearch && matchesCategory && matchesSize && matchesCondition;
  });

  return (
    <div className="browse-items fade-in">
      <div className="container">
        <div className="browse-header">
          <h1>Browse Items</h1>
          <p>Discover amazing pre-loved fashion from our community</p>
        </div>

        {/* Search and Filters */}
        <div className="search-section">
          <div className="search-bar">
            <Search className="search-icon" size={20} />
            <input
              type="text"
              placeholder="Search for items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          
          <div className="view-controls">
            <button
              className="filter-toggle"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter size={16} />
              Filters
            </button>
            
            <div className="view-mode">
              <button
                className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                onClick={() => setViewMode('grid')}
              >
                <Grid size={16} />
              </button>
              <button
                className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                onClick={() => setViewMode('list')}
              >
                <List size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="filters-panel">
            <div className="filter-group">
              <label>Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="filter-select"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label>Size</label>
              <select
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
                className="filter-select"
              >
                {sizes.map(size => (
                  <option key={size} value={size}>
                    {size === 'all' ? 'All Sizes' : size}
                  </option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label>Condition</label>
              <select
                value={selectedCondition}
                onChange={(e) => setSelectedCondition(e.target.value)}
                className="filter-select"
              >
                {conditions.map(condition => (
                  <option key={condition} value={condition}>
                    {condition === 'all' ? 'All Conditions' : condition.charAt(0).toUpperCase() + condition.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            <button
              className="clear-filters"
              onClick={() => {
                setSelectedCategory('all');
                setSelectedSize('all');
                setSelectedCondition('all');
                setSearchTerm('');
              }}
            >
              Clear All Filters
            </button>
          </div>
        )}

        {/* Results */}
        <div className="results-section">
          <div className="results-header">
            <p>{filteredItems.length} items found</p>
          </div>

          <div className={`items-container ${viewMode}`}>
            {filteredItems.map(item => (
              <ItemCard key={item.id} item={item} />
            ))}
          </div>

          {filteredItems.length === 0 && (
            <div className="no-results">
              <h3>No items found</h3>
              <p>Try adjusting your search criteria or filters</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BrowseItems;