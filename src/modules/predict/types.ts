// Types for Disease Diagnosis API

export interface PatientInput {
  age_band: "0-4" | "5-14" | "15-24" | "25-44" | "45-64" | "65+";
  gender: "male" | "female";
  setting: "urban" | "rural";
  region: "north" | "south" | "east" | "west" | "middle_belt";
  season: "dry" | "rainy";

  // Symptoms (binary: 0 or 1)
  fever: 0 | 1;
  headache: 0 | 1;
  cough: 0 | 1;
  fatigue: 0 | 1;
  body_ache: 0 | 1;
  chills: 0 | 1;
  sweats: 0 | 1;
  nausea: 0 | 1;
  vomiting: 0 | 1;
  diarrhea: 0 | 1;
  abdominal_pain: 0 | 1;
  loss_of_appetite: 0 | 1;
  sore_throat: 0 | 1;
  runny_nose: 0 | 1;
  dysuria: 0 | 1;
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
