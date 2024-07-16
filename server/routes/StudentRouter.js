import express from "express"
import { changePassword, createStudent, deleteStudentById, getAllStudents, getStudentById, login, updateStudentById, forgotPassword } from "../controller/StudentController.js";

const studentRouter = express.Router();
studentRouter.post("/createStudent", createStudent);
studentRouter.get("/", getAllStudents);
studentRouter.get("/findById/:id", getStudentById)
studentRouter.put("/updateById/:id", updateStudentById);
studentRouter.delete("/deleteById/:email", deleteStudentById);
studentRouter.post("/login", login);
studentRouter.put("/changePassword/:id", changePassword);
studentRouter.put("/forgotPassword/:email", forgotPassword);

export default studentRouter;