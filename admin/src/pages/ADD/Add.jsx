import React, { useEffect, useState } from 'react'
import './Add.css'
import { assets } from '../../assets/assets'
const Add = () => {
  const [image, setImage] = useState(false);
  const [data, setData] = useState({
    name: '',
    desc : '',
    price: '',
    category:"Salad"
  })

  const onChangeHandler = (event) => {
    const name = event.target.name ;
    const value = event.target.value;
    setData(data=>({
      ...data, [name]:value
    }))
  } 

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('desc', data.desc);
    formData.append('price', Number(data.price));
    formData.append('category', data.category);
    formData.append('image', image);
  }

  useEffect(()=> {
    
  }, [data])
  return (
    <div className="add">
      <h2 className="add-title">Add New Product</h2>
      <form>
        {/* Top Section: Image Left, Name & Desc Right */}
        <div className="add-top-section">
          <div className="add-image-upload">
            <p>Upload Image</p>
            <label htmlFor="image">
              <img src={image?URL.createObjectURL(image):assets.upload_area} alt="" />
            </label>
            <input onChange={(e) => setImage(e.target.files[0])} type="file" id='image' hidden required />
             
          </div>
          <div className="add-details">
            <div className="add-prod-name">
              <p>Product Name</p>
              <input onChange={onChangeHandler} value={data.name} type="text" name='name' placeholder='Type here' />
            </div>
            <div className="add-prod-desc">
              <p>Product Description</p>
              <textarea onChange={onChangeHandler} value={data.desc} name="desc" rows="5" placeholder='Type here' required></textarea>
            </div>
          </div>
        </div>

        {/* Bottom Section: Category, Price & Button */}
        <div className="add-bottom-section">
          <div className="add-category">
            <p>Category</p>
            <select onChange={onChangeHandler} value={data.category} name="category">
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Dessert">Dessert</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Cake">Cake</option>
              <option value="Pure Veg">Pure Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
            </select>
          </div>
          <div className="add-price">
            <p>Price</p>
            <input onChange={onChangeHandler} value={data.price}  type="Number" name='price' placeholder='$20' />
          </div>
          <button className='add-btn' type='submit'>Add Product</button>
        </div>
      </form>
    </div>
  )
}

export default Add