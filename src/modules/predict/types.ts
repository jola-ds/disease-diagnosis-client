// Types for Disease Diagnosis API

export interface PatientInput {
  age_band: "0-4" | "5-14" | "15-24" | "25-44" | "45-64" | "65+";
  gender: "male" | "female";
  setting: "urban" | "rural";
  region: "north" | "south" | "east" | "west" | "middle_belt";
  season: "dry" | "rainy";

  // General symptoms (binary: 0 or 1)
  fever: 0 | 1;
  headache: 0 | 1;
  cough: 0 | 1;
  chronic_cough: 0 | 1;
  productive_cough: 0 | 1;
  fatigue: 0 | 1;
  body_ache: 0 | 1;
  chills: 0 | 1;
  sweats: 0 | 1;
  night_sweats: 0 | 1;
  weight_loss: 0 | 1;
  loss_of_appetite: 0 | 1;

  // GI symptoms
  nausea: 0 | 1;
  vomiting: 0 | 1;
  diarrhea: 0 | 1;
  constipation: 0 | 1;
  abdominal_pain: 0 | 1;
  epigastric_pain: 0 | 1;
  heartburn: 0 | 1;
  hunger_pain: 0 | 1;

  // Respiratory symptoms
  sore_throat: 0 | 1;
  runny_nose: 0 | 1;
  chest_pain: 0 | 1;
  shortness_of_breath: 0 | 1;
  rapid_breathing: 0 | 1;
  hemoptysis: 0 | 1;

  // Genitourinary symptoms
  dysuria: 0 | 1;
  polyuria: 0 | 1;
  oliguria: 0 | 1;

  // Metabolic symptoms
  polydipsia: 0 | 1;
  polyphagia: 0 | 1;
  blurred_vision: 0 | 1;

  // Neurological symptoms
  dizziness: 0 | 1;
  confusion: 0 | 1;

  // Dermatological/Physical signs
  rash: 0 | 1;
  maculopapular_rash: 0 | 1;
  rose_spots: 0 | 1;
  conjunctivitis: 0 | 1;
  lymph_nodes: 0 | 1;

  // Infection-related symptoms
  recurrent_infections: 0 | 1;
  oral_thrush: 0 | 1;
}

export interface PredictionResponse {
  predicted_disease: string;
  confidence: number; // 0-1
  all_probabilities: Record<string, number>;
  timestamp: string;
}

export interface HealthResponse {
  status: string;
  timestamp: string;
  model_loaded: boolean;
  version: string;
}

export interface BatchPredictionRequest {
  patients: PatientInput[];
}

export interface BatchPredictionResponse {
  predictions: PredictionResponse[];
  total_patients: number;
}

export interface DiseasesResponse {
  diseases: string[];
  total_diseases: number;
}

export interface ModelInfoResponse {
  model_type: string;
  classes: string[];
  total_classes: number;
  features: string[];
  accuracy: string;
  description: string;
}

// Available disease types
export type DiseaseType =
  | "diabetes"
  | "gastroenteritis"
  | "healthy"
  | "hiv"
  | "hypertension"
  | "malaria"
  | "measles"
  | "peptic_ulcer"
  | "pneumonia"
  | "tuberculosis"
  | "typhoid";

// Available age bands
export type AgeBand = "0-4" | "5-14" | "15-24" | "25-44" | "45-64" | "65+";

// Available genders
export type Gender = "male" | "female";

// Available settings
export type Setting = "urban" | "rural";

// Available regions
export type Region = "north" | "south" | "east" | "west" | "middle_belt";

// Available seasons
export type Season = "dry" | "rainy";

// Symptom type (binary)
export type Symptom = 0 | 1;
