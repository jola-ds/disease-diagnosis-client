"use client";

import { useEffect, useState } from "react";
import { PredictionResponse } from "../../types";
import { PredictForm } from "../components/predict-form";
import { PredictionResults } from "../components/prediction-results";

export const PredictView = () => {
  const [predictionResult, setPredictionResult] =
    useState<PredictionResponse | null>(null);

  useEffect(() => {
    // Scroll to top of the page
    window.scrollTo(0, 0);
  }, [predictionResult]);

  const handleBack = () => {
    setPredictionResult(null);
  };

  return (
    <div className="app-container h-fit">
      <div className="mx-auto max-w-2xl">
        {predictionResult ? (
          <PredictionResults
            predictionResult={predictionResult}
            onBack={handleBack}
          />
        ) : (
          <PredictForm onPredictionResult={setPredictionResult} />
        )}
      </div>
    </div>
  );
};
