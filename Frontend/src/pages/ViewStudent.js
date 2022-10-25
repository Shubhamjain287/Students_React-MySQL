import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const ViewStudents = () => {

  const [data, setData] = useState({});

  const {userID} = useParams();

  useEffect(() => {
    axios.get(`http://localhost:2800/api/getbyid/${userID}`).then((res) => {
      setData({...res.data[0]})
    }).catch((err) => {
      console.log(err);
    })
  }, [userID])
    

  return (
    <>
      <h1> View Student </h1>
      <ul>
        <li> {data.id} </li>
        <li> {data.name} </li>
        <li> {data.email} </li>
        <li> {data.section} </li>
      </ul>
      <Link to="/">
        <button> Home Page </button>
      </Link>
    </>
  )
}

export default ViewStudents;