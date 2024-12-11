import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const AddTodoPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "pending",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/create-todo", formData);
      toast.success("Todo created successfully!");
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create todo.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg"
      >
        <h1 className="text-3xl font-bold text-center mb-6">Add New Todo</h1>

        <label className="block mb-2 text-sm font-semibold">Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="w-full mb-4 p-3 border rounded-lg text-sm focus:ring-2 focus:ring-blue-400"
          required
        />

        <label className="block mb-2 text-sm font-semibold">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full mb-4 p-3 border rounded-lg text-sm focus:ring-2 focus:ring-blue-400"
          rows="4"
        />

        <label className="block mb-2 text-sm font-semibold">Status</label>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full mb-6 p-3 border rounded-lg text-sm focus:ring-2 focus:ring-blue-400"
        >
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>

        <div className="flex justify-between space-x-4">
          <button
            type="submit"
            className="w-full p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-400 focus:ring-2 focus:ring-blue-400"
          >
            Create Todo
          </button>
          <button
            type="button"
            onClick={() => navigate("/")}
            className="w-full p-3 bg-gray-500 text-white rounded-lg hover:bg-gray-400 focus:ring-2 focus:ring-gray-400"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTodoPage;
