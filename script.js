const cards = document.querySelectorAll(
  ".info-card, .about-text, .skills-card, .reflection-box, .case-card, .comparison-panel, .insight-strip div, .artifact-two-hero, .artifact-three-hero, .problem-card, .pipeline-lab, .quality-dashboard, .architecture-card"
);

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  },
  {
    threshold: 0.15
  }
);

cards.forEach(card => {
  card.style.opacity = "0";
  card.style.transform = "translateY(25px)";
  card.style.transition = "all 0.7s ease";
  observer.observe(card);
});

const style = document.createElement("style");
style.innerHTML = `
  .show {
    opacity: 1 !important;
    transform: translateY(0) !important;
  }
`;
document.head.appendChild(style);

const pipelineStages = {
  ingestion: {
    tag: "Stage 1",
    title: "Data Ingestion",
    icon: "Ingestion",
    description:
      "Raw data is collected from applications, files, APIs, logs, or databases. This is the starting point of the pipeline, where data first enters the cloud environment.",
    tools: "Cloud Storage, Pub/Sub, Dataflow",
    value:
      "Creates a reliable starting point for downstream analysis and model preparation."
  },
  storage: {
    tag: "Stage 2",
    title: "Cloud Storage Landing Zone",
    icon: "Storage",
    description:
      "Raw data is stored safely before transformation. Keeping an original copy supports auditing, troubleshooting, and reprocessing if business rules change later.",
    tools: "Cloud Storage, IAM, lifecycle policies",
    value:
      "Protects the original data and creates traceability before transformation."
  },
  cleaning: {
    tag: "Stage 3",
    title: "Data Cleaning and Transformation",
    icon: "Cleaning",
    description:
      "Missing values, duplicate records, incorrect formats, and inconsistent fields are corrected. This step improves trust before the data is used for analytics or ML.",
    tools: "Dataflow, Dataproc, Dataform, SQL",
    value:
      "Improves model accuracy by reducing noise, errors, and inconsistent inputs."
  },
  bigquery: {
    tag: "Stage 4",
    title: "BigQuery Analytics Layer",
    icon: "BigQuery",
    description:
      "Cleaned data is organized into trusted BigQuery tables. This makes the data easier to query, analyze, document, and share with stakeholders.",
    tools: "BigQuery, SQL, scheduled queries",
    value:
      "Creates structured, analytics-ready data that can support reporting and ML preparation."
  },
  features: {
    tag: "Stage 5",
    title: "Feature Preparation",
    icon: "Features",
    description:
      "Important fields are selected or created for machine learning. For example, a churn model may need contract length, payment history, support tickets, and usage patterns.",
    tools: "BigQuery ML, Vertex AI Feature Store, SQL",
    value:
      "Turns business data into useful signals that a machine learning model can learn from."
  },
  ml: {
    tag: "Stage 6",
    title: "Machine Learning Readiness",
    icon: "ML Ready",
    description:
      "Before training, the dataset is checked for quality, fairness, completeness, and usefulness. This helps prevent unreliable or misleading predictions.",
    tools: "Vertex AI, BigQuery ML, model monitoring",
    value:
      "Supports responsible AI by making sure the model is trained on reliable data."
  }
};

const stageButtons = document.querySelectorAll(".pipeline-step");
const stageTag = document.getElementById("stageTag");
const stageTitle = document.getElementById("stageTitle");
const stageDescription = document.getElementById("stageDescription");
const stageTools = document.getElementById("stageTools");
const stageValue = document.getElementById("stageValue");
const activeStageIcon = document.getElementById("activeStageIcon");

stageButtons.forEach(button => {
  button.addEventListener("click", () => {
    stageButtons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");

    const stage = pipelineStages[button.dataset.stage];

    stageTag.textContent = stage.tag;
    stageTitle.textContent = stage.title;
    stageDescription.textContent = stage.description;
    stageTools.textContent = stage.tools;
    stageValue.textContent = stage.value;
    activeStageIcon.textContent = stage.icon;
  });
});

const completeSlider = document.getElementById("completeSlider");
const accuracySlider = document.getElementById("accuracySlider");
const consistencySlider = document.getElementById("consistencySlider");

const completeValue = document.getElementById("completeValue");
const accuracyValue = document.getElementById("accuracyValue");
const consistencyValue = document.getElementById("consistencyValue");

const readinessScore = document.getElementById("readinessScore");
const readinessLabel = document.getElementById("readinessLabel");

function updateReadinessScore() {
  const completeness = Number(completeSlider.value);
  const accuracy = Number(accuracySlider.value);
  const consistency = Number(consistencySlider.value);

  completeValue.textContent = `${completeness}%`;
  accuracyValue.textContent = `${accuracy}%`;
  consistencyValue.textContent = `${consistency}%`;

  const score = Math.round((completeness + accuracy + consistency) / 3);

  readinessScore.textContent = `${score}%`;

  if (score >= 85) {
    readinessLabel.textContent = "Strong ML foundation";
  } else if (score >= 70) {
    readinessLabel.textContent = "Needs improvement";
  } else {
    readinessLabel.textContent = "High model risk";
  }
}

[completeSlider, accuracySlider, consistencySlider].forEach(slider => {
  slider.addEventListener("input", updateReadinessScore);
});

updateReadinessScore();
