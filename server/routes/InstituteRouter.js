import express from "express"
import { approveInstitute, changePassword, collegeLogin, createCollege, deleteCollegeById, getAllColleges, getCollegeById, rejectInstitute, updateCollegeById } from "../controller/InstituteController.js";

const collegeRouter = express.Router();
collegeRouter.post("/createInstitute", createCollege);
collegeRouter.get("/", getAllColleges);
collegeRouter.get("/:id", getCollegeById)
collegeRouter.put("/updateById/:id", updateCollegeById);
collegeRouter.delete("/deleteById/:email", deleteCollegeById);
collegeRouter.post("/instituteLogin", collegeLogin);
collegeRouter.put("/changePassword/:id", changePassword);
collegeRouter.put("/rejectInstitute/:id", rejectInstitute);
collegeRouter.put("/approveInstitute/:id", approveInstitute)

export default collegeRouter;