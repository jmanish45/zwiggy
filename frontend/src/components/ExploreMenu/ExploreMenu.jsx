import React from 'react'
import './ExploreMenu.css'
import { menu_list } from '../../assets/assets'
import { useState } from 'react'

const ExploreMenu = ({category, setCategory}) => {
  return (
    <div className='explore-menu' id='explore-menu'>
        <h1>Explore our Menu</h1>
        {/* <p className="explore-menu-text"><em>Discover delicious options from our diverse menu</em></p> */}
        <div className="explore-menu-list">
            {
                menu_list.map((item, index)=> {
                    return (
                        <div key={index} onClick={() => setCategory(prev=>prev===item.menu_name?"All":item.menu_name)} className="explore-menu-list-item">
                            <img className={category===item.menu_name ? "active" : ""} src={item.menu_image} alt="" />
                            <p>{item.menu_name}</p>
                        </div>
                    )
                })
                
            }
        </div>
        <hr />
    </div>
  )
}

export default ExploreMenu