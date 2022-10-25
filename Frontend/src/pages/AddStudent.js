import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const AddStudent = () => {
  
  const Navigate = useNavigate();
  
  const [data, setData] = useState({
    name : "",
    id : "",
    email : "",
    section : ""
  });

  const { name , id , section , email} = data;

  // const [id , setId] = useState('');
  // const [name, setName] = useState('');
  // const [email , setEmail] = useState('');
  // const [section , setSection] = useState('');

  const {userID} = useParams();

  useEffect( () => {
    axios.get(`http://localhost:2800/api/getbyid/${userID}`).then((resp) => {
      setData({...resp.data[0]});
    }).catch((err) => console.log(err));
  }, [userID]);
  

  const submitData = async (e) => {
    e.preventDefault();
    if(!name || !id || !email || !section){
      return toast.error(`Please Enter Value in Each Field`);
    }
    else{

      if(!id){
        const data = await axios.post(`http://localhost:2800/api/post`,{
          name , email , id , section
        });
        if(!data){
          return toast.error(`Server Error Occured`);
        }
        toast.success(`Student Added Successfully !!`);
        setData({ name : "" , id : "", email : "", section : "" });
        setTimeout(() => Navigate('/') , 500);
      }
      else{
        const data = await axios.put(`http://localhost:2800/api/update/${userID}`,{
          name , email , section
        });
        if(!data){
          return toast.error(`Server Error Occured`);
        }
        toast.success(`Student Updated Successfully !!`);
        setData({ name : "" , id : "", email : "", section : "" });
        setTimeout(() => Navigate('/') , 500);
      }

    }
  }

  const handleInput = (e) => {
    const {name , value} = e.target;
    setData({...data , [name] : value})
  }
  
  return (
    <>
      <div> Add Student </div>
      <form onSubmit={submitData}>
        <label htmlFor="id"> id </label>
        <input type="text" name="id" id="id"  value={id || ""} onChange={handleInput} />

        <label htmlFor="name"> Name </label>
        <input type="text" name="name" id="name" value={name || ""} onChange={handleInput} />
        
        <label htmlFor="email"> Email </label>
        <input type="text" name="email" id="email" value={email || ""} onChange={handleInput}/>

        <label htmlFor="section"> Section </label>
        <input type="text" name="section" id="section" value={section || ""} onChange={handleInput} />

        <button type='submit'> { userID ? "Update" : "Save"} </button>
        <Link to="/"> <button> Home </button> </Link>
      </form>
    </>
  )
}

export default AddStudent