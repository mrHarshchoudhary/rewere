import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, X, Plus, Info } from 'lucide-react';
import './AddItem.css';

const AddItem: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    size: '',
    condition: '',
    brand: '',
    tags: [] as string[],
    pointsValue: ''
  });
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const categories = [
    'Tops', 'Bottoms', 'Dresses', 'Outerwear', 'Shoes', 'Accessories', 'Activewear', 'Formal'
  ];

  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'One Size'];
  const conditions = ['Excellent', 'Good', 'Fair'];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (images.length + files.length > 5) {
      alert('You can upload maximum 5 images');
      return;
    }

    setImages(prev => [...prev, ...files]);
    
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setImagePreviews(prev => [...prev, e.target.result as string]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
  };

  const addTag = () => {
    if (currentTag.trim() && !formData.tags.includes(currentTag.trim()) && formData.tags.length < 5) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, currentTag.trim()]
      }));
      setCurrentTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleTagKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag();
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.category) newErrors.category = 'Category is required';
    if (!formData.size) newErrors.size = 'Size is required';
    if (!formData.condition) newErrors.condition = 'Condition is required';
    if (!formData.pointsValue) newErrors.pointsValue = 'Points value is required';
    if (images.length === 0) newErrors.images = 'At least one image is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Mock API call - in real app, upload to server
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      alert('Item submitted successfully! It will be reviewed by our moderators.');
      navigate('/dashboard');
    } catch (error) {
      alert('Failed to submit item. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="add-item fade-in">
      <div className="container">
        <div className="add-item-header">
          <h1>List a New Item</h1>
          <p>Share your pre-loved fashion with the community</p>
        </div>

        <form onSubmit={handleSubmit} className="add-item-form">
          {/* Image Upload */}
          <div className="form-section">
            <h3>Photos</h3>
            <p className="section-description">Add up to 5 high-quality photos of your item</p>
            
            <div className="image-upload-area">
              {imagePreviews.map((preview, index) => (
                <div key={index} className="image-preview">
                  <img src={preview} alt={`Preview ${index + 1}`} />
                  <button
                    type="button"
                    className="remove-image"
                    onClick={() => removeImage(index)}
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
              
              {images.length < 5 && (
                <label className="upload-placeholder">
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    hidden
                  />
                  <Upload size={32} />
                  <span>Add Photos</span>
                </label>
              )}
            </div>
            
            {errors.images && <div className="error-message">{errors.images}</div>}
          </div>

          {/* Basic Information */}
          <div className="form-section">
            <h3>Basic Information</h3>
            
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="title" className="form-label">
                  Item Title *
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  className={`form-input ${errors.title ? 'error' : ''}`}
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="e.g., Vintage Denim Jacket"
                  maxLength={100}
                />
                {errors.title && <div className="error-message">{errors.title}</div>}
              </div>

              <div className="form-group">
                <label htmlFor="brand" className="form-label">
                  Brand
                </label>
                <input
                  type="text"
                  id="brand"
                  name="brand"
                  className="form-input"
                  value={formData.brand}
                  onChange={handleInputChange}
                  placeholder="e.g., Levi's"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="description" className="form-label">
                Description *
              </label>
              <textarea
                id="description"
                name="description"
                className={`form-textarea ${errors.description ? 'error' : ''}`}
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Describe the item's condition, style, and any special features..."
                rows={4}
                maxLength={500}
              />
              <div className="character-count">
                {formData.description.length}/500
              </div>
              {errors.description && <div className="error-message">{errors.description}</div>}
            </div>
          </div>

          {/* Item Details */}
          <div className="form-section">
            <h3>Item Details</h3>
            
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="category" className="form-label">
                  Category *
                </label>
                <select
                  id="category"
                  name="category"
                  className={`form-select ${errors.category ? 'error' : ''}`}
                  value={formData.category}
                  onChange={handleInputChange}
                >
                  <option value="">Select category</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
                {errors.category && <div className="error-message">{errors.category}</div>}
              </div>

              <div className="form-group">
                <label htmlFor="size" className="form-label">
                  Size *
                </label>
                <select
                  id="size"
                  name="size"
                  className={`form-select ${errors.size ? 'error' : ''}`}
                  value={formData.size}
                  onChange={handleInputChange}
                >
                  <option value="">Select size</option>
                  {sizes.map(size => (
                    <option key={size} value={size}>{size}</option>
                  ))}
                </select>
                {errors.size && <div className="error-message">{errors.size}</div>}
              </div>

              <div className="form-group">
                <label htmlFor="condition" className="form-label">
                  Condition *
                </label>
                <select
                  id="condition"
                  name="condition"
                  className={`form-select ${errors.condition ? 'error' : ''}`}
                  value={formData.condition}
                  onChange={handleInputChange}
                >
                  <option value="">Select condition</option>
                  {conditions.map(condition => (
                    <option key={condition} value={condition}>{condition}</option>
                  ))}
                </select>
                {errors.condition && <div className="error-message">{errors.condition}</div>}
              </div>

              <div className="form-group">
                <label htmlFor="pointsValue" className="form-label">
                  Points Value *
                  <span className="tooltip">
                    <Info size={14} />
                    <div className="tooltip-content">
                      Set the point value for this item based on its brand, condition, and market value.
                    </div>
                  </span>
                </label>
                <input
                  type="number"
                  id="pointsValue"
                  name="pointsValue"
                  className={`form-input ${errors.pointsValue ? 'error' : ''}`}
                  value={formData.pointsValue}
                  onChange={handleInputChange}
                  placeholder="30"
                  min="1"
                  max="500"
                />
                {errors.pointsValue && <div className="error-message">{errors.pointsValue}</div>}
              </div>
            </div>
          </div>

          {/* Tags */}
          <div className="form-section">
            <h3>Tags</h3>
            <p className="section-description">Add up to 5 tags to help people find your item</p>
            
            <div className="tags-input">
              <div className="current-tags">
                {formData.tags.map((tag, index) => (
                  <span key={index} className="tag">
                    {tag}
                    <button type="button" onClick={() => removeTag(tag)}>
                      <X size={12} />
                    </button>
                  </span>
                ))}
              </div>
              
              {formData.tags.length < 5 && (
                <div className="add-tag">
                  <input
                    type="text"
                    value={currentTag}
                    onChange={(e) => setCurrentTag(e.target.value)}
                    onKeyPress={handleTagKeyPress}
                    placeholder="Add a tag..."
                    className="tag-input"
                  />
                  <button type="button" onClick={addTag} className="add-tag-btn">
                    <Plus size={16} />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="form-actions">
            <button type="button" className="btn btn-secondary" onClick={() => navigate(-1)}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <span className="loading"></span>
                  Submitting...
                </>
              ) : (
                'Submit for Review'
              )}
            </button>
          </div>

          <div className="submission-info">
            <Info size={16} />
            <p>Your item will be reviewed by our moderators and published within 24 hours if approved.</p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddItem;