import Student from "../models/StudentModel.js"
import bcrypt from 'bcrypt'
import { sendForgotPasswordEmail } from "../utils/EmailService.js";

const generateRandomText = (length) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
};

export const createStudent = async (req, res) => {

    try {

        const student = new Student(req.body);

        if (!Student) {
            return res.status(400)
                .json({ message: "Nothing to save" });
        }

        const email = student.email;

        const existingStudent = await Student.findOne({ email });

        if (existingStudent) {
            return res.status(400)
                .json({ message: `Student already Exists` });
        }

        await student.save();

        return res.status(200)
            .json({ message: "Registered Successfully" });

    } catch (error) {
        return res.status(500)
            .json({ message: `Internal Server Error: ${error}` });
    }
}

export const getAllStudents = async (req, res) => {

    try {
        return res.status(200).json(await Student.find());

    } catch (error) {
        return res.status(500)
            .json({ message: `Internal Server Error: ${error}` });
    }
}

export const getStudentById = async (req, res) => {
    try {
        const id = req.params.id;

        if (id) {
            const student = await Student.findById(id);
            if (!student) {
                return res.status(400)
                    .json({ message: "Student not Found" });
            }
            return res.status(200)
                .json(student);
        }

    } catch (error) {
        return res.status(500)
            .json({ message: `Internal Server Error: ${error}` });
    }
}

export const updateStudentById = async (req, res) => {
    try {

        const id = req.params.id;

        const student = req.body;

        if (student) {
            await Student.findByIdAndUpdate(id, student, { new: true });
            return res.status(200)
                .json({ message: "Data Updated Successfully" });
        }

    } catch (error) {
        return res.status(500)
            .json({ message: `Internal Server Error: ${error}` });
    }
}

export const deleteStudentById = async (req, res) => {
    try {

        const id = req.params.id;

        await Student.findByIdAndDelete(id);

        return res.status(200)
            .json({ message: "Record deleted successfully" })

    } catch (error) {
        return res.status(500)
            .json({ message: `Internal Server Error: ${error}` });
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body)
    try {
        const student = await Student.findOne({ email });
        console.log(student)
        if (!student) {
            return res.status(404)
                .json({ message: "Student not found" });
        }

        const isMatch = await bcrypt.compare(password, student.password);

        if (!isMatch) {
            return res.status(401).
                json({ message: "Invalid Credentials", status: 0 })
        }

        return res.status(200).
            json({ student })

    } catch (error) {
        return res.status(500)
            .json({ message: `Server Error ${error}` })
    }
}

export const changePassword = async (req, res) => {

    const { oldPassword, newPassword } = req.body;
    const { id } = req.params;

    try {
        const student = await Student.findById(id)

        if (!student) {
            return res.status(404)
                .json({ message: "User not found" });
        }

        const isMatch = await
            bcrypt.compare(oldPassword, student.password);

        if (!isMatch) {
            return res.status(401)
                .json({ message: "Entered password is wrong" });
        }

        student.password = newPassword;

        await student.save();

        return res.status(200)
            .json({
                message: "Password Changed Successfully :"
            });

    } catch (error) {
        return res.status(500)
            .json({ message: `Server error: ${error}` })
    }

}

export const forgotPassword = async (req, res) => {
    const { email } = req.params;
    try {

        console.log(email)
        let student = await Student.findOne({ email });

        if (!student) {
            return res.status(404)
                .json({ message: "Student Not Found" });
        }

        const randomText = generateRandomText(8); // Generate an 8-character random string

        student.password = randomText;

        student = await Student.findByIdAndUpdate(student._id, student, { new: true });

        console.log("Updated Password: ", randomText);
        sendForgotPasswordEmail(student.email, student.firstName, randomText);
        return res.status(200)
            .json({ message: "Success" });
    } catch (error) {
        return res.status(500)
            .json({ message: `Server error: ${error}` })
    }
}