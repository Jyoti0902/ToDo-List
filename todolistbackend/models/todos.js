import mongoose from "mongoose";

const todoSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  taskCompleted: {
    type: Boolean,
  },
});

export const todoModel = mongoose.model("todos", todoSchema);
