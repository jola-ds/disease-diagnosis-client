import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import { ArrowLeft } from "lucide-react";
import { PredictionResponse } from "../../types";
import { ResultsChart } from "./results-chart";

interface PredictionResultsProps {
  predictionResult: PredictionResponse;
  onBack: () => void;
}

export const PredictionResults = ({
  predictionResult,
  onBack,
}: PredictionResultsProps) => {
  const predictionDate = new Date(`${predictionResult.timestamp}+00:00`);
  const formattedDate = format(predictionDate, "MMM d, yyyy 'at' h:mm a");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          size="sm"
          onClick={onBack}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Form
        </Button>
      </div>
      <Card className="p-3">
        <CardHeader className="p-0">
          <CardTitle className="text-lg font-semibold">
            Prediction Results
          </CardTitle>
          <CardDescription>
            Disease prediction completed successfully
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 overflow-hidden p-0">
          {/* Main Prediction Section */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <h3 className="font-semibold">Prediction Summary</h3>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <h4 className="text-muted-foreground text-sm font-medium">
                  Predicted Disease
                </h4>
                <Badge
                  variant="secondary"
                  className="px-3 py-1 text-lg capitalize"
                >
                  {predictionResult.predicted_disease === "healthy"
                    ? "Healthy / Inconclusive"
                    : predictionResult.predicted_disease.replace(/_/g, " ")}
                </Badge>
              </div>
              <div className="space-y-2">
                <h4 className="text-muted-foreground text-sm font-medium">
                  Confidence Level
                </h4>
                <div className="text-primary text-2xl font-bold">
                  {(predictionResult.confidence * 100).toFixed(1)}%
                </div>
              </div>
            </div>

            {/* Special message for healthy results */}
            {predictionResult.predicted_disease === "healthy" && (
              <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <svg
                      className="h-5 w-5 text-amber-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-amber-800">
                      Healthy or Inconclusive Result
                    </h3>
                    <div className="mt-1 text-sm text-amber-700">
                      The model suggests the patient may be healthy, but this
                      result should be interpreted with caution, as they may
                      have a disease that is not accounted for or the result may
                      be inconclusive.
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <Separator />

          {/* Disease Probabilities Chart Section */}
          <ResultsChart predictionResult={predictionResult} />

          <Separator />

          {/* Timestamp */}
          <div className="text-muted-foreground text-xs">
            Prediction made at: {formattedDate}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
