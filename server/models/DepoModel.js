import bcrypt from "bcrypt";
import mongoose, { Schema } from "mongoose";

const depoSchema = new Schema({

    depoName: {
        type: String,
        required: true,
        trim: true,
        min: 3
    },
    depoCode: {
        type: String,
    },
    depoEmail: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    depoAddress: {
        type: String
    },
    password: {
        type: String,
        required: true
    }
});

depoSchema.pre('save', async function () {
    try {
        const userData = this;
        const saltRounds = 10;

        if (userData.isModified('password')) {
            userData.password =
                await bcrypt.hash(userData.password, saltRounds);
        }
    } catch (error) {
        throw error;
    }
});

// Middleware to hash password before updating
depoSchema.pre('findOneAndUpdate', async function () {
    try {
        const userData = this.getUpdate(); // `this` refers to the query object
        const saltRounds = 10;

        if (userData.password) {
            userData.password = await bcrypt.hash(userData.password, saltRounds);
        }
    } catch (error) {
        throw error;
    }
});

export default mongoose.model("Depo", depoSchema);