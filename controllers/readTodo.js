import Todo from "../models/Todo.js";

export const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find();
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ message: "Server error.", error: error.message });
  }
};
export const getTodoById = async (req, res) => {
  try {
    const { id } = req.params; 
    const todo = await Todo.findById(id);

    if (!todo) {
      return res.status(404).json({ message: "Todo not found." }); 
    }

    res.status(200).json(todo);
  } catch (error) {
    res.status(500).json({ message: "Server error.", error: error.message });
  }
};
