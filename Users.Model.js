import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },

        email: {
            type: String,
            required: true,
            unique: true
        },

        password: {
            type: String,
            required: true
        },

        role: {
            type: String,
            enum: ["user", "admin"], // allowed values only
            default: "user" // every new account is user
        }
    },
    {
        timestamps: true,
    }
);

export default mongoose.model('users', userSchema);
