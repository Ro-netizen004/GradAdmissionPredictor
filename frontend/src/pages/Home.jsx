import React, { useState } from "react";
import Footer from "../components/Footer";
export default function Home() {
  const [formData, setFormData] = useState({
    gre: "",
    toefl: "",
    uni_rating: "",
    sop: "",
    lor: "",
    cgpa: "",
    research: ""
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateInputs = () => {
    const gre = Number(formData.gre);
    if (isNaN(gre) || gre < 0 || gre > 340) return "GRE must be between 0 and 340.";

    const toefl = Number(formData.toefl);
    if (isNaN(toefl) || toefl < 0 || toefl > 120) return "TOEFL must be between 0 and 120.";

    const uni_rating = Number(formData.uni_rating);
    if (isNaN(uni_rating) || uni_rating < 1 || uni_rating > 5) return "University Rating must be between 1 and 5.";

    const sop = Number(formData.sop);
    if (isNaN(sop) || sop < 1 || sop > 5) return "SOP Strength must be between 1 and 5.";

    const lor = Number(formData.lor);
    if (isNaN(lor) || lor < 1 || lor > 5) return "LOR Strength must be between 1 and 5.";

    const cgpa = Number(formData.cgpa);
    if (isNaN(cgpa) || cgpa < 0 || cgpa > 10) return "CGPA must be between 0 and 10.";

    const research = Number(formData.research);
    if (!(research === 0 || research === 1)) return "Research Experience must be 0 or 1.";

    return null; // no errors
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    const validationError = validateInputs();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);

    const payload = {
      gre: Number(formData.gre),
      toefl: Number(formData.toefl),
      uni_rating: Number(formData.uni_rating),
      sop: Number(formData.sop),
      lor: Number(formData.lor),
      cgpa: Number(formData.cgpa),
      research: Number(formData.research)
    };

    try {
      const res = await fetch("https://gradadmissionpredictorbackend.onrender.com/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`Server error: ${res.statusText}`);

      const data = await res.json();
      setResult(data.admission_chance);
    } catch (err) {
      setError(err.message || "Failed to fetch");
    } finally {
      setLoading(false);
    }
  };

  const inputs = [
    { label: "GRE Score", name: "gre", type: "number" },
    { label: "TOEFL Score", name: "toefl", type: "number" },
    { label: "University Rating", name: "uni_rating", type: "number" },
    { label: "SOP Strength", name: "sop", type: "number", step: "0.1" },
    { label: "LOR Strength", name: "lor", type: "number", step: "0.1" },
    { label: "CGPA", name: "cgpa", type: "number", step: "0.01" },
    { label: "Research Experience (0 or 1)", name: "research", type: "number" }
  ];

  return (
    <>
    <div className="max-w-md lg:max-w-4xl mx-auto mt-6 font-sans p-4 lg:px-12 bg-white rounded shadow-sm">
      <h1 className="text-xl font-semibold mb-4 text-center">Graduate Admission Predictor</h1>

      <div className="mb-6 p-3 bg-blue-50 border border-blue-200 rounded text-sm text-blue-800">
        <p><strong>Input Ranges & Output:</strong></p>
        <ul className="list-disc list-inside space-y-1">
          <li>GRE Scores (out of 340)</li>
          <li>TOEFL Scores (out of 120)</li>
          <li>University Rating (1 to 5)</li>
          <li>Statement of Purpose and Letter of Recommendation Strength (1 to 5)</li>
          <li>Undergraduate GPA (0 to 10)</li>
          <li>Research Experience (0 or 1)</li>
          <li>Chance of Admit (ranging from 0 to 1)</li>
        </ul>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="flex flex-col lg:flex-row lg:flex-wrap lg:-mx-2">
          {inputs.map(({ label, name, type, step }) => (
            <div key={name} className="w-full lg:w-1/2 lg:px-2 mb-3">
              <label htmlFor={name} className="block mb-0.5 text-sm font-medium text-gray-700">{label}:</label>
              <input
                id={name}
                name={name}
                type={type}
                step={step}
                value={formData[name]}
                onChange={handleChange}
                required
                className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                min={name === "gre" ? 0 : name === "toefl" ? 0 : name === "uni_rating" ? 1 : name === "sop" ? 1 : name === "lor" ? 1 : name === "cgpa" ? 0 : undefined}
                max={name === "gre" ? 340 : name === "toefl" ? 120 : name === "uni_rating" ? 5 : name === "sop" ? 5 : name === "lor" ? 5 : name === "cgpa" ? 10 : undefined}
                // research input min/max:
                {...(name === "research" ? { min: 0, max: 1 } : {})}
              />
            </div>
          ))}
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-1.5 mt-3 text-sm font-semibold text-white rounded ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Predicting..." : "Predict"}
        </button>
      </form>

      {result !== null && (
        <div className="mt-4 text-center text-base font-semibold text-green-700">
          Admission Chance: {(result * 100).toFixed(2)}%
        </div>
      )}

      {error && (
        <div className="mt-4 text-center text-sm text-red-600 font-medium">
          Error: {error}
        </div>
      )}

      {/* Citation Section */}
      <div className="mt-8 p-4 bg-gray-50 border border-gray-200 rounded text-xs text-gray-600">
        <p><strong>Dataset Citation</strong></p>
        <p>The model here uses the Graduate Admissions Dataset available at <a href="https://www.kaggle.com/datasets/mohansacharya/graduate-admissions" target="_blank" rel="noreferrer" className="text-blue-600 underline">Kaggle</a>.</p>
        <p className="mt-2 italic">
          Mohan S Acharya, Asfia Armaan, Aneeta S Antony.<br />
          A Comparison of Regression Models for Prediction of Graduate Admissions.<br />
          IEEE International Conference on Computational Intelligence in Data Science, 2019.
        </p>
      </div>
      
    </div>
    <Footer />
    </>
  );
}

