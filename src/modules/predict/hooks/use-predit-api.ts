import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import {
  BatchPredictionRequest,
  BatchPredictionResponse,
  DiseasesResponse,
  HealthResponse,
  ModelInfoResponse,
  PatientInput,
  PredictionResponse,
} from "../types";

export const usePredictApi = () => {
  const predictMutation = useMutation<PredictionResponse, Error, PatientInput>({
    mutationKey: ["predict"],
    mutationFn: async (data: PatientInput) => {
      const response = await axios.post<PredictionResponse>(
        `${process.env.NEXT_PUBLIC_API_URL}/predict`,
        data,
      );
      return response.data;
    },
  });

  const batchPredictMutation = useMutation<
    BatchPredictionResponse,
    Error,
    BatchPredictionRequest
  >({
    mutationKey: ["batch-predict"],
    mutationFn: async (data: BatchPredictionRequest) => {
      const response = await axios.post<BatchPredictionResponse>(
        `${process.env.NEXT_PUBLIC_API_URL}/predict/batch`,
        data,
      );
      return response.data;
    },
  });

  const healthCheck = async (): Promise<HealthResponse> => {
    const response = await axios.get<HealthResponse>(
      `${process.env.NEXT_PUBLIC_API_URL}/health`,
    );
    return response.data;
  };

  const getDiseases = async (): Promise<DiseasesResponse> => {
    const response = await axios.get<DiseasesResponse>(
      `${process.env.NEXT_PUBLIC_API_URL}/diseases`,
    );
    return response.data;
  };

  const getModelInfo = async (): Promise<ModelInfoResponse> => {
    const response = await axios.get<ModelInfoResponse>(
      `${process.env.NEXT_PUBLIC_API_URL}/model/info`,
    );
    return response.data;
  };

  return {
    predictMutation,
    batchPredictMutation,
    healthCheck,
    getDiseases,
    getModelInfo,
  };
};
