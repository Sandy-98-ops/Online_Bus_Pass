import PassApplication from '../models/PassApplication.js';
import mongoose from 'mongoose';

const { isValidObjectId } = mongoose;

export const createPassApplication = async (req, res) => {

    try {
        const { firstName, lastName, address, course, from, to, passStatus, studentId, institute, fromDate, toDate } = req.body;
        console.log(req.body)
        const files = req.files;
        const photo = files && files['photo'] && files['photo'][0].path;
        const aadharCard = files && files['aadharCard'] && files['aadharCard'][0].path;
        const collegeRecipt = files && files['collegeRecipt'] && files['collegeRecipt'][0].path;

        // Validate studentId
        if (!isValidObjectId(studentId)) {
            return res.status(400).json({ message: "Invalid studentId format try after relogin" });
        }

        const newPassApp = new PassApplication({
            studentId,
            institute,
            firstName,
            lastName,
            address,
            course,
            from,
            to,
            fromDate,
            toDate,
            passStatus,
            photo,
            aadharCard,
            collegeRecipt,
        });

        const existingApplication = await PassApplication.findOne({ studentId });

        if (existingApplication && existingApplication.passStatus !== 'Rejected') {
            return res.status(400).json({ message: "Application Already Exists" });
        }

        await newPassApp.save();
        res.status(200).json({ message: 'Application created successfully' });
    } catch (error) {
        console.error("Server Error:", error);
        res.status(500).json({ message: `Server Error: ${error.message}` });
    }
};


export const getInstitutePassApplications = async (req, res) => {
    try {
        const institute = req.params.id;

        const Applications = await PassApplication.find({ institute });

        if (!Applications || Applications.length === 0) {
            return res.status(404).json({ message: "No Applications found" });
        }

        return res.status(200).json(Applications);

    } catch (error) {
        return res.status(500).json({ message: `Internal Server Error: ${error.message}` });
    }
}

export const getPassApplications = async (req, res) => {
    try {
        const Applications = await PassApplication.find();

        if (!Applications || Applications.length === 0) {
            return res.status(404).json({ message: "No Applications found" });
        }

        return res.status(200).json(Applications);

    } catch (error) {
        return res.status(500).json({ message: `Internal Server Error: ${error.message}` });
    }
}

export const instituteApproval = async (req, res) => {

    const id = req.params.id;

    const application = await PassApplication.findById(id);

    if (!application) {
        return res.status(404)
            .json({ message: "Application Not Found" });
    }

    application.passStatus = "Approved By Institute";

    await PassApplication.findByIdAndUpdate(id, application, { new: true });

    return res.status(200).
        json({ message: "Status updated successfully" });

}


export const instituteRejection = async (req, res) => {

    const id = req.params.id;

    const application = await PassApplication.findById(id);

    if (!application) {
        return res.status(404)
            .json({ message: "Application Not Found" });
    }

    application.passStatus = "Rejected By Institute";

    await PassApplication.findByIdAndUpdate(id, application, { new: true });

    return res.status(200).
        json({ message: "Status updated successfully" });

}


export const depoApproval = async (req, res) => {

    const id = req.params.id;

    const application = await PassApplication.findById(id);

    if (!application) {
        return res.status(404)
            .json({ message: "Application Not Found" });
    }

    application.passStatus = "Approved By Depo";

    await PassApplication.findByIdAndUpdate(id, application, { new: true });

    return res.status(200).
        json({ message: "Status updated successfully" });

}


export const depoRejection = async (req, res) => {

    const id = req.params.id;

    const application = await PassApplication.findById(id);

    if (!application) {
        return res.status(404)
            .json({ message: "Application Not Found" });
    }

    application.passStatus = "Rejected By Depo";

    await PassApplication.findByIdAndUpdate(id, application, { new: true });

    return res.status(200).
        json({ message: "Status updated successfully" });

}