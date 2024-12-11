import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
import { setTodos, deleteTodo } from "../reducers/slices/todoSlice.js";
import { ClipLoader } from "react-spinners";
import { FaEdit, FaTrash } from "react-icons/fa";
import { MdFilterList } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { todos } = useSelector((state) => state.todo);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("all");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:5000/api/get-todo");
        dispatch(setTodos(response.data));
        setLoading(false);
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to fetch todos.");
        setLoading(false);
      }
    };

    fetchTodos();
  }, [dispatch]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this todo?")) {
      try {
        await axios.delete(`http://localhost:5000/api/delete-todo/${id}`);
        dispatch(deleteTodo(id));
        toast.success("Todo deleted successfully.");
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to delete todo.");
      }
    }
  };

  const filteredTodos = todos.filter((todo) =>
    filter === "all" ? true : todo.status === filter
  );

  return (
    <div className="container mx-auto p-6 text-sm sm:text-base">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h1 className="text-2xl sm:text-4xl font-bold text-blue-700">Todo List</h1>
        <button
          className="mt-4 md:mt-0 p-2 sm:p-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-500 transition"
          onClick={() => navigate("/add")}
        >
          Create Todo
        </button>
      </div>

      <div className="relative mb-6 flex justify-end">
        <button
          className="p-1 sm:p-2 bg-gray-100 rounded-lg shadow-md flex items-center hover:bg-gray-200 transition"
          onClick={() => setIsFilterOpen(!isFilterOpen)}
        >
          <MdFilterList className="text-lg sm:text-xl mr-2" />
          Filter: {filter === "all" ? "All" : filter}
        </button>
        {isFilterOpen && (
          <div className="absolute top-12 right-0 w-48 bg-white border rounded-lg shadow-lg z-10">
            <ul>
              {["all", "pending", "in-progress", "completed"].map((status) => (
                <li
                  key={status}
                  className="p-2 hover:bg-blue-100 cursor-pointer"
                  onClick={() => {
                    setFilter(status);
                    setIsFilterOpen(false);
                  }}
                >
                  {status === "all"
                    ? "All"
                    : status.charAt(0).toUpperCase() + status.slice(1)}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {loading ? (
        <div className="flex justify-center items-center">
          <ClipLoader size={50} color="#3b82f6" />
        </div>
      ) : todos.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-48 text-gray-500">
          <p className="text-lg">No todos found!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTodos.map((todo) => (
            <div
              key={todo._id}
              className="p-4 sm:p-6 border rounded-lg shadow-md bg-white hover:shadow-lg transition"
            >
              <h2 className="text-xl sm:text-2xl font-semibold mb-2 text-gray-800">
                {todo.title}
              </h2>
              <p className="text-gray-600 mb-4 text-sm sm:text-base">{todo.description}</p>
              <span
                className={`inline-block mb-4 px-3 sm:px-4 py-1 text-xs sm:text-sm rounded-lg font-medium ${
                  todo.status === "completed"
                    ? "bg-green-100 text-green-800"
                    : todo.status === "in-progress"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {todo.status.charAt(0).toUpperCase() + todo.status.slice(1)}
              </span>
              <div className="flex justify-end space-x-2 sm:space-x-3">
                <button
                  className="p-1 sm:p-2 bg-green-500 text-white rounded-full hover:bg-green-400 transition"
                  onClick={() => navigate(`/edit/${todo._id}`)}
                >
                  <FaEdit />
                </button>
                <button
                  className="p-1 sm:p-2 bg-red-500 text-white rounded-full hover:bg-red-400 transition"
                  onClick={() => handleDelete(todo._id)}
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;
