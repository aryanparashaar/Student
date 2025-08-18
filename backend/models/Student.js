const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  mobile: { type: String, required: true },
  qualification: { type: String, required: true },
  college: { type: String, required: true },
  experience: { type: String, enum: ["fresher", "experienced"], required: true },
  passOutYear: { type: Number, required: true },
  skills: { type: String, required: true },
  resume: { type: String, required: true }, // file path or filename
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Student", studentSchema);
