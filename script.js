const questions = [
  "Do you feel chest pain?",
  "Do you have difficulty breathing?",
  "Do you experience frequent headaches?",
  "Do you feel tired or weak?",
  "Have you had a fever recently?",
  "Are you experiencing dizziness?",
  "Do you have a persistent cough?",
  "Do you have any swelling in limbs?",
  "Have you lost weight unintentionally?",
  "Do you have trouble sleeping?"
];

const severityMap = { "No": 0, "Mild": 1, "Severe": 2, "Yes": 1 };

const form = document.getElementById("cardio-form");
const questionsDiv = document.getElementById("questions");
const resultDiv = document.getElementById("result");

// Create dropdowns for each question
questions.forEach((q, i) => {
  const label = document.createElement("label");
  label.textContent = q;
  const select = document.createElement("select");
  select.name = `q${i}`;
  ["No", "Mild", "Severe", "Yes"].forEach(opt => {
    const option = document.createElement("option");
    option.value = opt;
    option.textContent = opt;
    select.appendChild(option);
  });
  questionsDiv.appendChild(label);
  questionsDiv.appendChild(select);
});

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const date = document.getElementById("date").value;
  const inputs = Array.from(form.querySelectorAll("select")).map(s => severityMap[s.value] || 0);

  // Simple risk calculation: average severity
  const avg = inputs.reduce((a, b) => a + b, 0) / inputs.length;
  const riskPercent = Math.round((avg / 2) * 100);
  const riskLevel = riskPercent >= 50 ? "High" : "Low";
  const tests = riskLevel === "High" ? "ECG, Lipid Profile, Blood Sugar" : "Basic Checkup";

  resultDiv.innerHTML = `
    <p>🧾 Cardio Risk Report</p>
    <p>Name: ${name}</p>
    <p>Date: ${date}</p>
    <p>Risk Level: ${riskLevel}</p>
    <p>Risk Percentage: ${riskPercent}%</p>
    <p>Recommended Tests: ${tests}</p>
  `;
});
