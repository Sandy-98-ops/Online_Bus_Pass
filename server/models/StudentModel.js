import bcrypt from "bcrypt";
import mongoose, { Schema } from "mongoose";

const studentSchema = new Schema({

    firstName: {
        type: String,
        required: true,
        trim: true,
        min: 3
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    address: {
        type: String
    },
    dateOfBirth: {
        type: String
    },
    gender: {
        type: String,
    },
    institute: {
        type: Schema.Types.ObjectId, // Referencing another model
        ref: 'Institute', // Name of the model being referenced
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

studentSchema.pre('save', async function () {
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
studentSchema.pre('findOneAndUpdate', async function () {
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

export default mongoose.model("Student", studentSchema);