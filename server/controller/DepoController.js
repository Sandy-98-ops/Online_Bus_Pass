import bcrypt from 'bcrypt'
import Depo from '../models/DepoModel.js';

export const createDepo = async (req, res) => {

    try {

        const depo = new Depo(req.body)

        if (!depo) {
            return res.status(400)
                .json({ message: "Nothing to save" });
        }

        const depoEmail = depo.depoEmail;

        const existingDepo = await Depo.findOne({ depoEmail });

        if (existingDepo) {
            return res.status(400)
                .json({ message: `Depo already Exists` });
        }

        await depo.save();

        return res.status(200)
            .json({ message: "Registered Successfully" });

    } catch (error) {
        return res.status(500)
            .json({ message: `Internal Server Error: ${error}` });
    }
}

export const getAllDepos = async (req, res) => {

    try {
        return res.status(200).json(await Depo.find());

    } catch (error) {
        return res.status(500)
            .json({ message: `Internal Server Error: ${error}` });
    }
}

export const getDepoById = async (req, res) => {
    try {
        const id = req.params.id;

        if (id) {
            const depo = await Depo.findById(id);
            if (!depo) {
                return res.status(400)
                    .json({ message: "Depo not Found" });
            }
            return res.status(200)
                .json(depo);
        }

    } catch (error) {
        return res.status(500)
            .json({ message: `Internal Server Error: ${error}` });
    }
}

export const updateDepoById = async (req, res) => {
    try {

        const id = req.params.id;

        const depo = req.body;

        if (depo) {
            await Depo.findByIdAndUpdate(id, depo, { new: true });

            return res.status(200)
                .json({ message: "Data Updated Successfully" });
        }

    } catch (error) {
        return res.status(500)
            .json({ message: `Internal Server Error: ${error}` });
    }
}

export const deleteDepoById = async (req, res) => {
    try {
        console.log(req.params.id);

        const id = req.params.id;

        await Depo.findByIdAndDelete(id);

        return res.status(200)
            .json({ message: "Record deleted successfully" })

    } catch (error) {
        return res.status(500)
            .json({ message: `Internal Server Error: ${error}` });
    }
}

export const depoLogin = async (req, res) => {
    const { depoEmail, password } = req.body;

    console.log(depoEmail)
    try {
        const depo = await Depo.findOne({ depoEmail });

        if (!depo) {
            return res.status(404)
                .json({ message: "Depo not found" });
        }

        const isMatch = await bcrypt.compare(password, depo.password);

        if (!isMatch) {
            return res.status(401).
                json({ message: "Invalid Credentials", status: 0 })
        }

        return res.status(200).
            json({ depo })

    } catch (error) {
        return res.status(500)
            .json({ message: `Server Error ${error}` })
    }
}

export const changePassword = async (req, res) => {

    const { oldPassword, newPassword } = req.body;
    const { id } = req.params;

    try {
        const depo = await Depo.findById(id)

        if (!depo) {
            return res.status(404)
                .json({ message: "User not found" });
        }

        const isMatch = await
            bcrypt.compare(oldPassword, depo.password);

        if (!isMatch) {
            return res.status(401)
                .json({ message: "Entered password is wrong" });
        }

        depo.password = newPassword;

        await depo.save();

        return res.status(200)
            .json({
                message: "Password Changed Successfully :"
            });

    } catch (error) {
        return res.status(500)
            .json({ message: `Server error: ${error}` })
    }

}