const Student = require("../models/Student");
const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

// Multer config for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueName =
      "resume-" + Date.now() + "-" + Math.round(Math.random() * 1e9) + path.extname(file.originalname);
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

// POST - Register a student
router.post("/", upload.single("resume"), async (req, res) => {
  try {
    const {
      name,
      email,
      mobile,
      qualification,
      college,
      experience,
      passOutYear,
      skills,
    } = req.body;

    const resume = req.file?.filename;

    const newStudent = new Student({
      name,
      email,
      mobile,
      qualification,
      college,
      experience,
      passOutYear,
      skills,
      resume,
    });

    await newStudent.save();

    res.status(201).json({ message: "Student registered successfully." });
  } catch (err) {
    console.error("Error saving student:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ GET - Fetch all students
router.get("/", async (req, res) => {
  try {
    const students = await Student.find().sort({ createdAt: -1 });
    res.json(students);
  } catch (err) {
    console.error("Error fetching students:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
