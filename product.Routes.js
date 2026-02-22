import express from "express";
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controllers/products.Controller.js";
import { protect } from "../middleware/auth.Middleware.js";
import { adminOnly } from "../middleware/admin.Middleware.js";
import { checkRole } from "../middleware/checkRole.Middleware.js";

const router = express.Router();

router.get("/products", protect, getAllProducts);

router.post("/admin/products", protect, adminOnly, createProduct);

router.get("/products/:id", protect, getProductById);

router.put("/admin/products/:id", protect, checkRole("admin"), adminOnly, updateProduct);

router.delete("/admin/products/:id", protect, adminOnly, deleteProduct);

export default router;
