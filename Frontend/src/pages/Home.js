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

  const deleteContact = async (id) => {

    if(window.confirm(`Are You Sure that you want to delete that Student ?`)){

        await axios.delete(`http://localhost:2800/api/delete/${id}`);
        toast.success(`Contact Deleted Successfully !!`);
        setTimeout(() => loadData() , 500);

    }

  }

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
                                <th> {item.id} </th>
                                <th> {item.name} </th>
                                <th> {item.email} </th>
                                <th> {item.section} </th>
                                <td>
                                    <Link to={`/viewstudent/${item.id}`}>
                                        <button> View </button>
                                    </Link>
                                    <Link to={`/updatestudent/${item.id}`}>
                                        <button> Edit </button>
                                    </Link>
                                    <button onClick={() => deleteContact(item.id)}> Delete </button>
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