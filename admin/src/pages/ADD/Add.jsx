import React, { useEffect, useState } from 'react'
import './Add.css'
import { assets } from '../../assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify'
// This component is for adding a new product to the menu. It includes a form with fields for the product name, description, price, category, and an image upload. The form data is managed using the useState hook, and the onSubmitHandler function is responsible for handling the form submission and preparing the data to be sent to the backend API. The useEffect hook can be used to perform any side effects or data fetching if needed when the component mounts or when the data state changes.
const Add = ({url}) => {
   
  const [image, setImage] = useState(false); // State to hold the uploaded image file , false means no image uploaded yet
  const [data, setData] = useState({  // State to hold the form data for the new product  
    name: '',     
    desc : '',
    price: '',
    category:"Salad"
  })

  const onChangeHandler = (event) => {  // This function is called whenever there is a change in any of the form fields. It updates the corresponding field in the data state based on the name attribute of the input element that triggered the event.
    const name = event.target.name ;  // Get the name of the input field that triggered the change event for example name in "name" will be "name", "desc" for description, "price" for price and "category" for category
    ///what can be the name of desc input field -> "desc"
    const value = event.target.value;  // Get the new value entered by the user in the input field
    //value of name input field -> whatever user types in the name input field, value of desc input field -> whatever user types in the description textarea, value of price input field -> whatever user types in the price input field and value of category select field -> whatever user selects from the dropdown

    //difference between name and value in desc -> name is the field name (e.g., "desc"), value is the new value entered by the user in the description textarea  
    setData(data=>({
      ...data, [name]:value  // Update the data state by spreading the existing data and updating the specific field that changed using computed property names 
      // [name] means that we are using the value of the name variable as the key in the data object and assigning it the new value entered by the user. For example, if the name variable is "desc", then this will update the desc field in the data state with the new value entered by the user in the description textarea. 
    }))
  } 

  const onSubmitHandler = async (e) => {  // This function is called when the form is submitted. It prevents the default form submission behavior, creates a new FormData object, and appends all the necessary fields (name, description, price, category, and image) to it. This FormData object can then be sent to the backend API to create a new product in the database.
    e.preventDefault();  
    const formData = new FormData(); // FormData is a built-in JavaScript object that allows you to easily construct a set of key/value pairs representing form fields and their values, which can then be sent using the fetch API or XMLHttpRequest to the backend server. It is especially useful for handling file uploads, as it can automatically handle the encoding of files and other form data when sending it to the server.

    formData.append('name', data.name);
    formData.append('description', data.desc);
    formData.append('price', Number(data.price));
    formData.append('category', data.category);
    formData.append('image', image);
    try {
      const response = await axios.post(`${url}/api/food/add`, formData); // Send a POST request to the backend API endpoint for adding a new product, with the formData as the request body. The response from the server is stored in the response variable.
      console.log(response.data);
      if(response.data.success) {
        setData({
          name: '',
          desc : '',
          price: '',
          category:"Salad"
        })
        // If the response indicates that the product was added successfully, reset the form data to its initial state (empty fields) and set the image state back to false (indicating no image uploaded). Then, display an alert with the success message from the server response.
        setImage(false);
        toast.success(response.data.message) // Display an alert with the success message from the server response, which can be used to inform the user that the product was added successfully.
      }
      else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Error submitting form. Check console for details.");
    }
  }

  // useEffect(()=> {
  //   console.log(data);
  // }, [data])


  return (
    <div className="add">
      <h2 className="add-title">Add New Product</h2>
      <form className='flex-col' onSubmit={onSubmitHandler}>
        {/* Top Section: Image Left, Name & Desc Right */}
        <div className="add-top-section">
          <div className="add-image-upload">
            <p>Upload Image</p>
            <label htmlFor="image">
              <img src={image?URL.createObjectURL(image):assets.upload_area} alt="" />  
              
              {/* Display the uploaded image preview if an image is selected, otherwise show the default upload area image */}
            </label>
            <input onChange={(e) => setImage(e.target.files[0])} type="file" id='image'  hidden required /> 
            
            {/* // Hidden file input for image upload, when the user clicks on the label (which contains the image), it triggers the file input. When a file is selected, the onChange event updates the image state with the selected file (the first file in the list of files, which is accessed using e.target.files[0]) */}
             
          </div>
          <div className="add-details">
            <div className="add-prod-name">
              <p>Product Name</p>
              <input onChange={onChangeHandler} value={data.name} type="text" name='name' placeholder='Type here' />
              
                 {/* Input field for the product name, it is a controlled component where the value is tied to the data.name state. When the user types in this input field, the onChangeHandler updates the data state with the new name value. */}
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