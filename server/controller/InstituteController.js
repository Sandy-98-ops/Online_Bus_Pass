import bcrypt from 'bcrypt'
import Institute from '../models/InstituteModel.js';

export const createCollege = async (req, res) => {

    try {

        const institute = new Institute(req.body)

        if (!institute) {
            return res.status(400)
                .json({ message: "Nothing to save" });
        }

        institute.rejected = false;
        institute.approved = false;

        const collegeEmail = institute.collegeEmail;

        const existingCollege = await Institute.findOne({ collegeEmail });

        if (existingCollege) {
            return res.status(400)
                .json({ message: `Institute already Exists` });
        }

        await institute.save();

        return res.status(200)
            .json({ message: "Registered Successfully" });

    } catch (error) {
        return res.status(500)
            .json({ message: `Internal Server Error: ${error}` });
    }
}

export const getAllColleges = async (req, res) => {

    try {
        return res.status(200).json(await Institute.find());

    } catch (error) {
        return res.status(500)
            .json({ message: `Internal Server Error: ${error}` });
    }
}

export const getCollegeById = async (req, res) => {
    try {
        const id = req.params.id;

        if (id) {
            const institute = await Institute.findById(id);
            if (!institute) {
                return res.status(400)
                    .json({ message: "Institute not Found" });
            }
            return res.status(200)
                .json(institute);
        }

    } catch (error) {
        return res.status(500)
            .json({ message: `Internal Server Error: ${error}` });
    }
}

export const updateCollegeById = async (req, res) => {
    try {

        const id = req.params.id;

        const institute = req.body;

        if (institute) {
            await Institute.findByIdAndUpdate(id, institute, { new: true });

            return res.status(200)
                .json({ message: "Data Updated Successfully" });
        }

    } catch (error) {
        return res.status(500)
            .json({ message: `Internal Server Error: ${error}` });
    }
}

export const deleteCollegeById = async (req, res) => {
    try {

        const id = req.params.id;

        await Institute.findByIdAndDelete(id);

        return res.status(200)
            .json({ message: "Record deleted successfully" })


    } catch (error) {
        return res.status(500)
            .json({ message: `Internal Server Error: ${error}` });
    }
}

export const collegeLogin = async (req, res) => {
    console.log("Entered here", req.body)
    const { collageEmail, password } = req.body;
    try {
        const institute = await Institute.findOne({ collageEmail });

        console.log(institute)
        if (!institute) {
            return res.status(404)
                .json({ message: "Institute not found" });
        }

        const isMatch = await bcrypt.compare(password, institute.password);

        if (!isMatch) {
            return res.status(401).
                json({ message: "Invalid Credentials", status: 0 })
        }

        return res.status(200).
            json({ institute })

    } catch (error) {
        return res.status(500)
            .json({ message: `Server Error ${error}` })
    }
}

export const changePassword = async (req, res) => {

    const { oldPassword, newPassword } = req.body;
    const { id } = req.params;

    try {
        const institute = await Institute.findById(id)

        if (!institute) {
            return res.status(404)
                .json({ message: "User not found" });
        }

        const isMatch = await
            bcrypt.compare(oldPassword, institute.password);

        if (!isMatch) {
            return res.status(401)
                .json({ message: "Entered password is wrong" });
        }

        institute.password = newPassword;

        await institute.save();

        return res.status(200)
            .json({
                message: "Password Changed Successfully :"
            });

    } catch (error) {
        return res.status(500)
            .json({ message: `Server error: ${error}` })
    }

}

export const approveInstitute = async (req, res) => {

    try {
        const { id } = req.params;

        const institute = await Institute.findById(id);

        if (!institute) {
            return res.status(400)
                .json({ message: `Institute not found` })
        }

        institute.approved = true;
        institute.rejected = false;

        console.log(institute)

        return res.status(200)
            .json(await Institute.findByIdAndUpdate(institute._id, institute, { new: true }));

    } catch (error) {
        return res.status(500)
            .json({ message: `Server error: ${error}` })
    }

}

export const rejectInstitute = async (req, res) => {
    try {
        const { id } = req.params;

        const institute = await Institute.findById(id);

        if (!institute) {
            return res.status(400)
                .json({ message: `Institute not found` })
        }

        institute.rejected = true;
        institute.approved = false;


        return res.status(200)
            .json(await Institute.findByIdAndUpdate(institute._id, institute, { new: true }));

    } catch (error) {
        return res.status(500)
            .json({ message: `Server error: ${error}` })
    }

}