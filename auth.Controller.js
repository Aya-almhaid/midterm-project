import User from "../models/Users.Model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Register logic
export const register = async (req, res) => {
    const { name, email, password, confirmPassword } = req.body;

    try {
        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Passwords don't match" });
        }
        console.log("1")

        const existingUser = await User.findOne({ email });
        if (existingUser) {//if is trying to register using existing email
            return res
                .status(400)
                .json({ message: "User already exists, try to login" });
        }

        if (password.length < 8) {
            return res
                .status(400)
                .json({ message: "Password must be at least 8 characters long" });
        }
        console.log("2")

        const hashedPassword = await bcrypt.hash(password, 10);
        console.log("4")

        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            role: "user",
        });
        console.log("3")

        return res
            .status(201)
            .json({ message: "User created successfully", user: newUser });
    } catch (error) {
        return res.status(500).json({ message: "Server error" });
    }
};

// Login logic with JWT
export const login = async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body)
    try {
        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        console.log(2)

        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res
                .status(404)
                .json({ message: "User not found, please register" });
        }
        console.log(3)
        const isPasswordValid = await bcrypt.compare(
            password,
            existingUser.password
        );
        console.log(4)

        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        console.log(5)

        // JWT generation (already implied by your imports)
        const token = jwt.sign(
            { id: existingUser._id, role: existingUser.role },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );
        console.log(6)

        return res.status(200).json({
            message: "Login successful",
            token,
            user: existingUser,
        });

    } catch (error) {
        return res.status(500).json({ message: "Server error" });
    }
};
