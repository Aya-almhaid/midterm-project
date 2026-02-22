export const adminOnly = async (req, res, next) => {
    if (req.user && req.user.role === "admin") {
        console.log(req.user.role);
        next();
    } else {
        return res.status(403).json({ message: "Access denied, admin only" });
    }
}

//admin, student, teacher