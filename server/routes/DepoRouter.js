import express from "express"
import { changePassword, createDepo, deleteDepoById, depoLogin, getAllDepos, getDepoById, updateDepoById } from "../controller/DepoController.js";

const depoRouter = express.Router();
depoRouter.post("/create", createDepo);
depoRouter.get("/", getAllDepos);
depoRouter.get("/findById/:id", getDepoById)
depoRouter.put("/updateById/:id", updateDepoById);
depoRouter.delete("/deleteById/:id", deleteDepoById);
depoRouter.post("/login", depoLogin);
depoRouter.put("/changePassword/:id", changePassword);

export default depoRouter;