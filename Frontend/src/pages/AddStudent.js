import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const AddStudent = () => {
  const Navigate = useNavigate();

  const [data, setData] = useState({
    enrollment: "",
    first_name: "",
    last_name: "",
    email: "",
    branch: "",
    section: "",
  });

  const { enrollment, first_name, last_name, email, branch, section } = data;

  const { enrollmentID } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:2800/api/getbyid/${enrollmentID}`)
      .then((resp) => {
        setData({ ...resp.data[0] });
      })
      .catch((err) => console.log(err));
  }, [enrollmentID]);

  const submitData = (e) => {
    e.preventDefault();
    if (
      !enrollment ||
      !first_name ||
      !last_name ||
      !email ||
      !branch ||
      !section
    ) {
      return toast.error(`Please Enter Value in Each Field`,{ position : "top-right" });
    } else {
      if (!enrollmentID) {
        axios
          .post(`http://localhost:2800/api/post`, {
            enrollment,
            first_name,
            last_name,
            email,
            branch,
            section,
          })
          .then((res) => {
            console.log(res);
            toast.success(`New Student Added Successfully !!`);
            setData({ name: "", enrollment: "", email: "", section: "" });
            setTimeout(() => Navigate("/"), 500);
          })
          .catch((err) => {
            console.log(err);
            toast.error(` Server Error Occurred !!`,{ position : "top-right" });
          });
      } else {
        axios
          .put(`http://localhost:2800/api/update/${enrollmentID}`, {
            first_name,
            last_name,
            email,
            branch,
            section,
          })
          .then(() => {
            toast.success(`Student Updated Successfully !!`,{ position : "top-right" });
            setData({
              enrollment: "",
              first_name: "",
              last_name: "",
              email: "",
              branch: "",
              section: "",
            });
            setTimeout(() => Navigate("/"), 500);
          })
          .catch((err) => {
            toast.error(` Server Error Occurred !!`,{ position : "top-right" });
          });
      }
    }
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  return (
    <>
      <h1 className="mb-4 mt-4 text-4xl font-extrabold tracking-tight text-center leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white"> Add Students </h1>
   <div class="container px-10 py-1 mx-auto">
    <div class="xl:w-1/2 lg:w-3/4 w-full mx-auto">
      <form className="m-5 p-5" onSubmit={submitData}>
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300" htmlFor="enrollment"> Enrollment </label>
        <input
          type="number"
          name="enrollment"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-4"
          id="enrollment"
          value={enrollment || ""}
          placeholder="Enter Student enrollment Number"
          onChange={handleInput}
        />

        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300" htmlFor="first_name"> first_name </label>
        <input
          type="text"
          name="first_name"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-4"
          id="first_name"
          value={first_name || ""}
          placeholder="Enter Student First Name"
          onChange={handleInput}
        />

        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300" htmlFor="last_name"> last_name </label>
        <input
          type="text"
          name="last_name"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-4"
          id="last_name"
          value={last_name || ""}
          placeholder="Enter Student last Name"
          onChange={handleInput}
        />

        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300" htmlFor="email"> Email </label>
        <input
          type="text"
          name="email"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-4"
          id="email"
          value={email || ""}
          placeholder="Enter Student Email ID"
          onChange={handleInput}
        />

        {/* <label htmlFor="branch"> Branch </label>
        <input type="text" name="branch" id="branch" value={branch || ""} placeholder="Enter Student Brnach Name" onChange={handleInput} /> */}

        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400" htmlFor="branch"> Branch </label>
        <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-4" name="branch" id="branch" onChange={handleInput}>
          <option value="">Select Branch</option>
          <option value="Computer Science Engineering">
            Computer Science Engineering
          </option>
          <option value="Information Technology">Information Technology</option>
          <option value="Mechanical Engineering">Mechanical Engineering</option>
          <option value="Electrical Engineering">Electrical Engineering</option>
        </select>

        {/* <label htmlFor="section"> Section </label>
        <input type="text" name="section" id="section" value={section || ""} placeholder="Enter Student Section" onChange={handleInput} /> */}

        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400" htmlFor="section"> Section </label>
        <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" name="section" id="section" onChange={handleInput}>
          <option value="">Select Section</option>
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
        </select>

        <button className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center" type="submit"> {enrollmentID ? "Update" : "Save"} </button>
        <Link to="/">
          <button className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center m-5" > Home </button>
        </Link>
      </form>
    </div>
    </div>
    </>
  );
};

export default AddStudent;
