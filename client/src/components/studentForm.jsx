import React, { useState } from "react";

export default function StudentForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    qualification: "",
    college: "",
    experience: "", // 'fresher' or 'experienced'
    passOutYear: "",
    skills: "",
    resume: null,
  });

  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    const { name, value, files } = e.target;
    if (name === "resume") {
      setFormData((prev) => ({ ...prev, resume: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const data = new FormData();
      for (const key in formData) {
        data.append(key, formData[key]);
      }

      const res = await fetch("http://localhost:5000/api/students", {
        method: "POST",
        body: data,
      });

      const result = await res.json();

      if (res.ok) {
        alert(result.message);
        setFormData({
          name: "",
          email: "",
          mobile: "",
          qualification: "",
          college: "",
          experience: "",
          passOutYear: "",
          skills: "",
          resume: null,
        });
      } else {
        alert("Error: " + result.error);
      }
    } catch (err) {
      alert("Network error: " + err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-6 bg-white rounded shadow"
    >
      <h2 className="text-2xl mb-6 font-semibold text-center">
        Applicant Info
      </h2>

      <input
        type="text"
        name="name"
        placeholder="Full Name"
        value={formData.name}
        onChange={handleChange}
        required
        className="input"
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
        className="input"
      />
      <input
        type="text"
        name="mobile"
        placeholder="Mobile Number"
        value={formData.mobile}
        onChange={handleChange}
        required
        className="input"
      />
      <input
        type="text"
        name="qualification"
        placeholder="Qualification"
        value={formData.qualification}
        onChange={handleChange}
        required
        className="input"
      />

      {/* New Fields Below */}

      <input
        type="text"
        name="college"
        placeholder="College Name"
        value={formData.college}
        onChange={handleChange}
        required
        className="input"
      />

      <div className="mt-4">
        <label className="block mb-1 font-medium text-gray-700">
          Experience
        </label>
        <div className="flex items-center space-x-4">
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="experience"
              value="fresher"
              checked={formData.experience === "fresher"}
              onChange={handleChange}
              required
            />
            <span>Fresher</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="experience"
              value="experienced"
              checked={formData.experience === "experienced"}
              onChange={handleChange}
              required
            />
            <span>Experienced</span>
          </label>
        </div>
      </div>

      <input
        type="number"
        name="passOutYear"
        placeholder="College Pass-out Year"
        value={formData.passOutYear}
        onChange={handleChange}
        required
        className="input"
      />

      <input
        type="text"
        name="skills"
        placeholder="Skills (comma-separated)"
        value={formData.skills}
        onChange={handleChange}
        required
        className="input"
      />

      <input
        type="file"
        name="resume"
        accept=".pdf"
        onChange={handleChange}
        required
        className="block w-full text-sm text-gray-700 
               file:mr-4 file:py-2 file:px-4
               file:rounded file:border-0
               file:text-sm file:font-semibold
               file:bg-blue-600 file:text-white
               hover:file:bg-blue-700 
               cursor-pointer mt-3"
      />

      <button
        type="submit"
        disabled={loading}
        className="mt-6 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
      >
        {loading ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}
