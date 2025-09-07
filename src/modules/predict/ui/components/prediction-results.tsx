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
        <CardContent className="space-y-6 p-0">
          {/* Main Prediction Section */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <h3 className="font-semibold">Prediction Summary</h3>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <h4 className="text-muted-foreground text-sm font-medium">
                  Predicted Disease
                </h4>
                <Badge
                  variant="secondary"
                  className="px-3 py-1 text-lg capitalize"
                >
                  {predictionResult.predicted_disease.replace(/_/g, " ")}
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
          </div>

          <Separator />

          {/* Disease Probabilities Chart Section */}
          <ResultsChart predictionResult={predictionResult} />

          <Separator />

          {/* Timestamp */}
          <div className="text-muted-foreground text-xs">
            Prediction made at:{" "}
            {new Date(predictionResult.timestamp).toLocaleString()}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
