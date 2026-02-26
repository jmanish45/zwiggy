import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './List.css'
import { toast } from 'react-toastify'


const List = () => {
  const url = "http://localhost:5000" 
  const [list, setList] = useState([]);
  
  const fetchlist = async () => {
    const response = await axios.get(`${url}/api/food/list`);
    //console.log(response.data);
    if(response.data.success) {
      setList(response.data.data)
    }
    else {
      toast.error("Error")
    }
  }

  const removeFood = async(foodId) => {
    const response = await axios.post(`${url}/api/food/remove`, {id:foodId})
    if(response.data.success) {
      toast.success("Food item removed successfully");
      await fetchlist();
    }
    else {
      toast.error("Error removing food item");
    }
  }
  useEffect(() => {
    fetchlist();   
  }, [])
  return (
    <div className='list add flex-col'>
        <p>All food list</p>
        <div className="list-table">
          <div className="list-table-format flex">
            <b>Image</b>
            <b>Name</b>
            <b>Price</b>
            <b>Category</b>
            <b>Action</b> 
          </div>
          {list.map((item, index)=> {
              return (
                <div key={index} className="list-table-format flex">
                  <img src={`${url}/images/`+item.image} alt="" />
                  <p>{item.name}</p>
                  <p>{item.price}</p>
                  <p>{item.category}</p>
                  <p onClick={()=> removeFood(item._id)} className='cursor'>X</p>
                  
                </div>
              )
          })}
        </div>
      </div>
  )
}

export default List