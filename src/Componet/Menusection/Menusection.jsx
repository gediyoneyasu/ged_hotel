import React, { useState } from 'react';
import './MenuSection.css';
// Import your menu item images
import breakfast1 from '../../assets/image/menu/breakfast1.png';
import breakfast2 from '../../assets/image/menu/breakfast2.png';
import breakfast3 from '../../assets/image/menu/breakfast3.png';
import lunch1 from '../../assets/image/menu/lunch1.png';
import lunch2 from '../../assets/image/menu/lunch2.png';
import lunch3 from '../../assets/image/menu/lunch3.png';
import dinner1 from '../../assets/image/menu/dinner.png';
import dinner2 from '../../assets/image/menu/dinner2.png';
import dinner3 from '../../assets/image/menu/dinner3.png';
import drink1 from '../../assets/image/menu/drink1.png';
import drink2 from '../../assets/image/menu/drink2.png';
import drink3 from '../../assets/image/menu/drink3.png';
import fastfood1 from '../../assets/image/menu/fast_food1.png';
import fastfood2 from '../../assets/image/menu/fast_food2.png';
import fastfood3 from '../../assets/image/menu/fast_food3.png';
import dessert1 from '../../assets/image/menu/desert1.png';
import dessert2 from '../../assets/image/menu/desert2.png';
import dessert3 from '../../assets/image/menu/desert3.png';

function MenuSection() {
  const [activeCategory, setActiveCategory] = useState('all');
  
  // Menu data
  const menuItems = [
    // Breakfast Items
    { id: 1, category: 'breakfast', name: 'Avocado Toast', description: 'Fresh avocado on artisan bread with cherry tomatoes', price: '$12.99', image: breakfast1 },
    { id: 2, category: 'breakfast', name: 'Classic Pancakes', description: 'Fluffy pancakes with maple syrup and berries', price: '$10.99', image: breakfast2 },
    { id: 3, category: 'breakfast', name: 'Eggs Benedict', description: 'Poached eggs with hollandaise on English muffins', price: '$14.99', image: breakfast3 },
    { id: 4, category: 'breakfast', name: 'Pasta Carbonara Breakfast', description: 'Italian pasta with eggs, cheese, and pancetta', price: '$13.99', image: breakfast1 },
    { id: 5, category: 'breakfast', name: 'Greek Yogurt Bowl', description: 'Yogurt with honey, nuts, and fresh fruits', price: '$9.99', image: breakfast2 },
    { id: 6, category: 'breakfast', name: 'Breakfast Burrito', description: 'Scrambled eggs, beans, cheese in tortilla', price: '$11.99', image: breakfast3 },
    
    // Lunch Items
    { id: 7, category: 'lunch', name: 'Chicken Caesar Salad', description: 'Grilled chicken with romaine and Caesar dressing', price: '$15.99', image: lunch1 },
    { id: 8, category: 'lunch', name: 'Beef Burger', description: 'Angus beef with cheese and special sauce', price: '$16.99', image: lunch2 },
    { id: 9, category: 'lunch', name: 'Club Sandwich', description: 'Triple-decker with turkey, bacon, and avocado', price: '$14.99', image: lunch3 },
    
    // Dinner Items
    { id: 10, category: 'dinner', name: 'Grilled Salmon', description: 'Atlantic salmon with lemon butter sauce', price: '$24.99', image: dinner1 },
    { id: 11, category: 'dinner', name: 'Filet Mignon', description: '8oz tenderloin with red wine reduction', price: '$32.99', image: dinner2 },
    { id: 12, category: 'dinner', name: 'Vegetable Lasagna', description: 'Layers of pasta, cheese, and fresh vegetables', price: '$18.99', image: dinner3 },
    
    // Drink Items
    { id: 13, category: 'drink', name: 'Fresh Orange Juice', description: 'Freshly squeezed orange juice', price: '$5.99', image: drink1 },
    { id: 14, category: 'drink', name: 'Iced Caramel Latte', description: 'Espresso with caramel and milk', price: '$6.99', image: drink2 },
    { id: 15, category: 'drink', name: 'Berry Smoothie', description: 'Mixed berries with yogurt and honey', price: '$7.99', image: drink3 },
    
    // Fast Food Items
    { id: 16, category: 'fastfood', name: 'Cheese Pizza', description: '12-inch pizza with mozzarella cheese', price: '$14.99', image: fastfood1 },
    { id: 17, category: 'fastfood', name: 'Chicken Wings', description: 'Crispy wings with choice of sauce', price: '$13.99', image: fastfood2 },
    { id: 18, category: 'fastfood', name: 'French Fries', description: 'Golden crispy fries with seasoning', price: '$5.99', image: fastfood3 },
    
    // Dessert Items
    { id: 19, category: 'dessert', name: 'Chocolate Lava Cake', description: 'Warm chocolate cake with molten center', price: '$8.99', image: dessert1 },
    { id: 20, category: 'dessert', name: 'Cheesecake', description: 'New York style with berry compote', price: '$9.99', image: dessert2 },
    { id: 21, category: 'dessert', name: 'Tiramisu', description: 'Italian coffee-flavored dessert', price: '$10.99', image: dessert3 },
  ];

  const categories = [
    { id: 'all', name: 'All' },
    { id: 'breakfast', name: 'Breakfast' },
    { id: 'lunch', name: 'Lunch' },
    { id: 'dinner', name: 'Dinner' },
    { id: 'drink', name: 'Drink' },
    { id: 'fastfood', name: 'Fast Food' },
    { id: 'dessert', name: 'Desserts' }
  ];

  const filteredItems = activeCategory === 'all' 
    ? menuItems 
    : menuItems.filter(item => item.category === activeCategory);

  const handleBuyNow = (itemName, itemPrice) => {
    alert(`Added to cart: ${itemName} - ${itemPrice}`);
    // In a real app, you would dispatch to Redux or update context here
  };

  return (
    <div className='menu-section' id='menu'>
      <h2 className='menu-title'>Our Menu</h2>
      
      {/* Category Filter */}
      <div className="menu-categories">
        <ul className='category-list'>
          {categories.map(category => (
            <li 
              key={category.id}
              className={`category-item ${activeCategory === category.id ? 'active' : ''}`}
              onClick={() => setActiveCategory(category.id)}
            >
              <a href={`#${category.id}`}>{category.name}</a>
            </li>
          ))}
        </ul>
      </div>

      {/* Menu Items Grid */}
      <div className='menu-items-container'>
        <div className="menu-grid">
          {filteredItems.map(item => (
            <div className="menu-card" key={item.id}>
              <div className="menu-image-container">
                <img className='menu-image' src={item.image} alt={item.name} />
                <div className="menu-category-badge">{item.category}</div>
              </div>
              
              <div className="menu-content">
                <div className="menu-header">
                  <h3 className="menu-item-name">{item.name}</h3>
                  <span className="menu-item-price">{item.price}</span>
                </div>
                
                <p className="menu-item-description">{item.description}</p>
                
                <div className="menu-actions">
                  <button 
                    className="buy-now-btn"
                    onClick={() => handleBuyNow(item.name, item.price)}
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default MenuSection;