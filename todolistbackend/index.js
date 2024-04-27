import express, { json } from "express";
import mongoose from "mongoose";
import { todoModel } from "./models/todos.js";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";

dotenv.config();
const port = 5000;
console.log(port);
const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//database connection
mongoose
  .connect(process.env.CONNECTION_LINK, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database is connected!"))
  .catch(() => console.log("Database is not connected"));

//APIs
app.post("/post", async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title || !description) {
      return res.status(400).json("All fields are required!");
    }
    const task = todoModel({
      title,
      description,
      taskCompleted: true,
    });
    await task.save();
    res.status(200).json({ message: "Todo task created successfully!" });
  } catch (error) {
    console.log(error, "Post API error!");
  }
});
//get API
app.get("/get", async (req, res) => {
  try {
    const allTasks = await todoModel.find();
    if (!allTasks) {
      return res.status(200).json({ message: "No tasks to show!" });
    }
    res.status(200).json({ message: "all tasks", allTasks });
  } catch (error) {
    console.log(error, "Get API error!");
  }
});
//get API
app.get("/get/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const allTasks = await todoModel.findById(id);
    if (!allTasks) {
      return res.status(200).json({ message: "No tasks to show!" });
    }
    res.status(200).json({ message: "all tasks", allTasks });
  } catch (error) {
    console.log(error, "Get API error!");
  }
});
//delete API
app.delete("/delete", async (req, res) => {
  try {
    const deleted = await todoModel.deleteMany();
    if (!deleted) {
      return res.status(200).json({ message: "No task to delete!" });
    }
    res.status(200).json({ message: "Task deleted successfully", deleted });
  } catch (error) {
    console.log(error, "Delete API error!");
  }
});
//delete by id API
app.delete("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await todoModel.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(200).json({ message: "No task to delete!" });
    }
    res.status(200).json({ message: "Task deleted successfully", deleted });
  } catch (error) {
    console.log(error, "Delete API error!");
  }
});
//put API
app.put("/update/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { title, description } = req.body;
    if (!title || !description) {
      return res.status(400).json("All fields are required!");
    }
    const tasks = await todoModel.findByIdAndUpdate(
      id,
      {
        title,
        description,
      },
      { new: true }
    );
    res.status(200).json({ message: "Task updated successfully", tasks });
  } catch (error) {
    console.log(error, "Put API error!");
  }
});
//patch API
app.patch("/update/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updatedTask = req.body;
    const tasks = await todoModel.findByIdAndUpdate(id, updatedTask, {
      new: true,
    });
    res.status(200).json({ message: "Task updated successfully", tasks });
  } catch (error) {
    console.log(error, "Patch API error!");
  }
});
//local host
app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
