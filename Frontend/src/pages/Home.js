import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const Home = () => {
  const [data, setData] = useState([]);

  const loadData = async () => {
    const res = await axios.get(`http://localhost:2800/api/getAllStudents`);
    setData(res.data);
    console.log(res.data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const deleteContact = async (id) => {
    if (window.confirm(`Are You Sure that you want to delete that Student ?`)) {
      await axios.delete(`http://localhost:2800/api/delete/${id}`);
      toast.success(`Contact Deleted Successfully !!`,{ position : "top-right" });
      setTimeout(() => loadData(), 500);
    }
  };

  return (
    <>
      <h1 className="mb-4 mt-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white"> All Students </h1>
      <Link className="p-5" to={`/AddStudent`}>
      <button type="button" class="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"> Add New Student </button>
      </Link>
      <div className="overflow-x-auto m-5 mr-10 ml-10 relative shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="py-3 px-6">
                No.
              </th>
              <th scope="col" className="py-3 px-6">
                Enrollment
              </th>
              <th scope="col" className="py-3 px-6">
                First Name
              </th>
              <th scope="col" className="py-3 px-6">
                Last Name
              </th>
              <th scope="col" className="py-3 px-6">
                Email
              </th>
              <th scope="col" className="py-3 px-6">
                Branch
              </th>
              <th scope="col" className="py-3 px-6">
                Section
              </th>
              <th scope="col" className="py-3 px-6">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => {
              return (
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <th
                    scope="row"
                    className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {index + 1}
                  </th>
                  <td className="py-4 px-6">{item.enrollment}</td>
                  <td className="py-4 px-6">{item.first_name}</td>
                  <td className="py-4 px-6">{item.last_name}</td>
                  <td className="py-4 px-6">{item.email}</td>
                  <td className="py-4 px-6">{item.branch}</td>
                  <td className="py-4 px-6">{item.section}</td>
                  <td className="py-4 px-6 text-right">
                    <Link
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      to={`/viewstudent/${item.enrollment}`}
                    >
                      <button class="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-xs font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800">
                        <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                          View
                        </span>
                      </button>
                    </Link>
                    <Link
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      to={`/updatestudent/${item.enrollment}`}
                    >
                      <button class="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-xs font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800">
                        <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                          Update
                        </span>
                      </button>
                    </Link>
                    <button
                      onClick={() => deleteContact(item.enrollment)}
                      className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-xs font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
                    >
                      <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                        Delete
                      </span>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Home;
