import axios from "axios";

const BASE_URL = "http://localhost:5000";
const API = axios.create({
    baseURL: BASE_URL
})

export const createTodo = (details) => API.post("/post", details);
export const updateTodoByPut = (updateDetails, id) => API.put(`/update/${id}`, updateDetails);
export const updateTodoByPatch = (updateDetails, id) => API.patch(`/update/${id}`, updateDetails);
export const deleteAll = () => API.delete("/delete");
export const deleteOne = (id) => API.delete(`/delete/${id}`);
export const getTasks = () => API.get("/get");
export const getById = (id) => API.get(`/get/${id}`);
