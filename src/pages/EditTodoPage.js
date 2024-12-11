import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const EditTodoPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "pending",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTodo = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:5000/api/get-by-id/${id}`);
        setFormData(response.data);
        setLoading(false);
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to fetch todo.");
        setLoading(false);
      }
    };

    fetchTodo();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/update-todo/${id}`, formData);
      toast.success("Todo updated successfully!");
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update todo.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg"
      >
        <h1 className="text-3xl font-bold text-center mb-6">Edit Todo</h1>
        {loading ? (
          <p className="text-gray-500 text-center">Loading...</p>
        ) : (
          <>
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
                Update
              </button>
              <button
                type="button"
                onClick={() => navigate("/")}
                className="w-full p-3 bg-gray-500 text-white rounded-lg hover:bg-gray-400 focus:ring-2 focus:ring-gray-400"
              >
                Cancel
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
};

export default EditTodoPage;
