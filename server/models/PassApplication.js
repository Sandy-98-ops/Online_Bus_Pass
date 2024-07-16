import mongoose from 'mongoose';
const { Schema } = mongoose;

const passApplicationSchema = new Schema({
    studentId: {
        type: Schema.Types.ObjectId, // Referencing another model
        ref: 'Student', // Name of the model being referenced
        required: true
    },
    institute: {
        type: Schema.Types.ObjectId, // Referencing another model
        ref: 'Institute', // Name of the model being referenced
        required: true
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
        min: 3
    },
    lastName: {
        type: String
    },
    address: {
        type: String
    },
    course: {
        type: String
    },
    from: {
        type: String
    },
    to: {
        type: String
    },
    fromDate: {
        type: String
    },
    toDate: {
        type: String
    },
    passStatus: {
        type: String
    },
    passAmount: {
        type: String
    },
    photo: {
        type: String
    }, // Path to the file
    aadharCard: {
        type: String
    }, // Path to the file
    collegeRecipt: {
        type: String
    } // Path to the file
});

export default mongoose.model('PassApplication', passApplicationSchema);
