import express from "express";
import mongoose from "mongoose";
import categoriesModel from "../models/categories.Model.js";
// -------------------------------
// create category
export const createCategory = async (req, res) => {
    const { name, description } = req.body;

    try {
        if (!name) {
            return res.status(400).json({ message: "the name is required" });
        }

        const newCategory = await Category.create({ name, description });

        res.status(201).json({
            message: "category created successfully",
            newCategory,
        });
    } catch (error) {
        res.status(500).json({ message: "error creating category" });
    }
};

// --------------------------------
// get all categories
export const getCategories = async (req, res) => {
    try {
        const categories = await Category.find();

        if (categories.length === 0) {
            return res.status(404).json({ message: "no categories found" });
        }

        res.status(200).json({ categories });
    } catch (error) {
        res.status(500).json({ message: "error fetching categories" });
    }
};

// --------------------------------
// get category by id
export const getCategoryById = async (req, res) => {
    const { id } = req.params;

    try {
        const category = await Category.findById(id);

        if (!category) {
            return res.status(404).json({ message: "category is not found" });
        }

        res.status(200).json({ category });
    } catch (error) {
        res.status(500).json({ message: "error fetching category" });
    }
};

// --------------------------------
// update category
export const updateCategory = async (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;

    try {
        const updatedCategory = await Category.findByIdAndUpdate(
            id,
            { name, description },
            { new: true }
        );

        if (!updatedCategory) {
            return res.status(404).json({ message: "category not found" });
        }

        res.status(200).json({
            message: "category updated successfully",
            updatedCategory,
        });
    } catch (error) {
        res.status(500).json({ message: "error updating category" });
    }
};

// --------------------------------
// delete category
export const deleteCategory = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedCategory = await Category.findByIdAndDelete(id);

        if (!deletedCategory) {
            return res.status(404).json({ message: "category not found" });
        }

        res.status(200).json({ message: "category deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "category can't be deleted", error });
    }
};
