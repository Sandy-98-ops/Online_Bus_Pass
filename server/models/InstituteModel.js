import bcrypt from "bcrypt";
import mongoose, { Schema } from "mongoose";

const instituteSchema = new Schema({

    collegeName: {
        type: String,
        required: true,
        trim: true,
        min: 3
    },
    collegeCode: {
        type: String,
    },
    collegeEmail: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    collegeAddress: {
        type: String
    },
    collegeDepo: {
        type: Schema.Types.ObjectId, // Referencing another model
        ref: 'Depo', // Name of the model being referenced
        required: true
    },
    password: {
        type: String,
        required: true
    },
    approved: {
        type: Boolean
    },
    rejected : {
        type : Boolean
    }
});

instituteSchema.pre('save', async function () {
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
instituteSchema.pre('findOneAndUpdate', async function () {
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

export default mongoose.model("Institute", instituteSchema);