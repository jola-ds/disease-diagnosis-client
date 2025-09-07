import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { PredictionResponse } from "../../types";

interface PredictionResultsProps {
  predictionResult: PredictionResponse;
}

export const PredictionResults = ({
  predictionResult,
}: PredictionResultsProps) => {
  return (
    <Card className="border-green-200 bg-green-50">
      <CardHeader>
        <CardTitle className="text-green-800">Prediction Results</CardTitle>
        <CardDescription>
          Disease prediction completed successfully
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <h4 className="font-semibold text-green-800">Predicted Disease</h4>
            <Badge variant="secondary" className="px-3 py-1 text-lg">
              {predictionResult.predicted_disease
                .replace(/_/g, " ")
                .toUpperCase()}
            </Badge>
          </div>
          <div className="space-y-2">
            <h4 className="font-semibold text-green-800">Confidence</h4>
            <div className="text-2xl font-bold text-green-600">
              {(predictionResult.confidence * 100).toFixed(1)}%
            </div>
          </div>
        </div>

        <Separator />

        <div className="space-y-2">
          <h4 className="font-semibold text-green-800">
            All Disease Probabilities
          </h4>
          <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
            {Object.entries(predictionResult.all_probabilities)
              .sort(([, a], [, b]) => b - a)
              .map(([disease, probability]) => (
                <div
                  key={disease}
                  className={cn(
                    "rounded-md p-2 text-sm",
                    disease === predictionResult.predicted_disease
                      ? "bg-green-200 font-semibold text-green-800"
                      : "bg-gray-100 text-gray-700",
                  )}
                >
                  <div className="font-medium">
                    {disease.replace(/_/g, " ").toUpperCase()}
                  </div>
                  <div className="text-xs">
                    {(probability * 100).toFixed(1)}%
                  </div>
                </div>
              ))}
          </div>
        </div>

        <div className="text-xs text-gray-500">
          Prediction made at:{" "}
          {new Date(predictionResult.timestamp).toLocaleString()}
        </div>
      </CardContent>
    </Card>
  );
};
