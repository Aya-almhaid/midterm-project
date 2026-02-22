//read role and check access
export const checkRole = (allowedRoles) => {
    return async (req, res, next) => {
        if (req.user && allowedRoles.includes(req.user.role)) {
            console.log(`User role: ${req.user.role}`, "allowed role", allowedRoles);
            next();
        } else {
            return res.status(403).json({ message: "Access denied" });
        }
    }
}