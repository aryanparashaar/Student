import React, { useEffect, useState } from "react";

export default function AdminPanel() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/students")
      .then((res) => res.json())
      .then((data) => {
        setStudents(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching students:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <h2 className="text-3xl font-semibold text-center mb-6">
        Registered Students
      </h2>

      {loading ? (
        <p className="text-center text-gray-600">Loading...</p>
      ) : students.length === 0 ? (
        <p className="text-center text-gray-600">No students registered yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {students.map((student) => (
            <div
              key={student._id}
              className="bg-white shadow-md rounded-lg p-5 border border-gray-200"
            >
              <h3 className="text-xl font-semibold mb-2">{student.name}</h3>
              <p className="text-gray-700">
                <strong>Email:</strong> {student.email}
              </p>
              <p className="text-gray-700">
                <strong>Mobile:</strong> {student.mobile}
              </p>
              <p className="text-gray-700">
                <strong>Qualification:</strong> {student.qualification}
              </p>
              <p className="text-gray-700">
                <strong>College:</strong> {student.college}
              </p>
              <p className="text-gray-700">
                <strong>Experience:</strong> {student.experience}
              </p>
              <p className="text-gray-700">
                <strong>Pass-out Year:</strong> {student.passOutYear}
              </p>
              <p className="text-gray-700">
                <strong>Skills:</strong> {student.skills}
              </p>

              {student.resume && (
                <a
                  href={`http://localhost:5000/uploads/${student.resume}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-4 text-blue-600 hover:underline"
                >
                  View Resume
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
