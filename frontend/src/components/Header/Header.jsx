import React from 'react'
import './Header.css'
import { Link } from 'react-router-dom'
const Header = () => {
  const scrollToMenu = () => {
    const exploreMenu = document.getElementById('explore-menu');
    if (exploreMenu) {
      exploreMenu.scrollIntoView({ behavior: 'smooth' });
    }
  }

  return (
    <div className='header'>
        <div className="header-contents">
            <h1>Order food & Dishes. Discover best restaurants. Zwiggy it!</h1>
            <p>Delicious meals delivered to your doorstep</p>
            <button onClick={scrollToMenu}>View Menu</button>
        </div>
    </div>
  )
}

export default Header