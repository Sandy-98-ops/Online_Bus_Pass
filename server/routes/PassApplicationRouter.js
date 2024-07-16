import express from 'express';
import { upload } from '../utils/multer-config.js';
import { createPassApplication, depoApproval, depoRejection, getInstitutePassApplications, getPassApplications, instituteApproval, instituteRejection } from '../controller/PassApplicationController.js';

const passApplicationRoutes = express.Router();

passApplicationRoutes.post('/upload', upload.fields([
    { name: 'photo' },
    { name: 'aadharCard' },
    { name: 'collegeRecipt' }
]), createPassApplication);

passApplicationRoutes.get("/getInstitutePassApplications/:id", getInstitutePassApplications);
passApplicationRoutes.get("/", getPassApplications);

passApplicationRoutes.put("/instituteApproval/:id", instituteApproval);
passApplicationRoutes.put("/instituteRejection/:id", instituteRejection);
passApplicationRoutes.put("/depoApproval/:id", depoApproval);
passApplicationRoutes.put("/depoRejection/:id", depoRejection);
export default passApplicationRoutes;
