import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import {toast} from 'react-toastify';
import axios from 'axios';

const Home = () => {
  const [data, setData] = useState([]);
  
  const loadData = async () => {
    const res = await axios.get(`http://localhost:2800/api/getAllStudents`);    
    setData(res.data);
    console.log(res.data);
  }

  useEffect(() => {
        loadData();
  },[]);

  return (
    <>
        <h1> Home </h1>
        <Link to={`/AddStudent`}>
            <button> Add Student </button>
        </Link>
        <table>
            <thead>
                <tr>
                    <th> No. </th>
                    <th> Enrollment </th>
                    <th> Name </th>
                    <th> Email </th>
                    <th> Section </th>
                </tr>
            </thead>
            <tbody>
                {
                    data.map((item , index) => {
                        return (
                            <tr>
                                <th> {index+1} </th>
                                <th> {item.enrollment} </th>
                                <th> {item.name} </th>
                                <th> {item.email} </th>
                                <th> {item.section} </th>
                                <td>
                                    <Link to={`/update/${item.id}`}>
                                        <button> Edit </button>
                                    </Link>
                                    <Link to={`/update/${item.id}`}>
                                        <button> Delete </button>
                                    </Link>
                                    <Link to={`/update/${item.id}`}>
                                        <button> View </button>
                                    </Link>
                                </td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    </>
  )
}

export default Home;