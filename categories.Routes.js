import express from "express";
import {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from "../controllers/categories.Controller.js";
import { protect } from "../middleware/auth.Middleware.js";
import { adminOnly } from "../middleware/admin.Middleware.js";

const router = express.Router();
// Create a new category
router.post("/admin/categories", protect, adminOnly, createCategory);

// Get all categories
router.get("/categories", protect, getCategories);

// Get a category by ID
router.get("/user/categories/:id", protect, getCategoryById);

// Update a category by ID
router.put("/admin/categories/:id", protect, adminOnly, updateCategory);

// Delete a category by ID
router.delete("/admin/categories/:id", protect, adminOnly, deleteCategory);

export default router;