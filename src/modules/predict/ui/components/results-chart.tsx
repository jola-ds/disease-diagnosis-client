import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Bar, BarChart, LabelList, XAxis, YAxis } from "recharts";
import { PredictionResponse } from "../../types";

interface ResultsChartProps {
  predictionResult: PredictionResponse;
}

export const ResultsChart = ({ predictionResult }: ResultsChartProps) => {
  // Prepare chart data from prediction results
  const chartData = Object.entries(predictionResult.all_probabilities)
    .sort(([, a], [, b]) => b - a)
    .map(([disease, probability], index) => ({
      disease: disease.replace(/_/g, " ").toUpperCase(),
      probability: probability * 100,
      fill:
        disease === predictionResult.predicted_disease
          ? "var(--primary)"
          : `var(--chart-${(index % 5) + 1})`,
      isPredicted: disease === predictionResult.predicted_disease,
    }));

  // Create chart configuration
  const chartConfig = {
    probability: {
      label: "Probability (%)",
    },
    ...chartData.reduce((config, item, index) => {
      config[item.disease] = {
        label: item.disease,
        color: `var(--chart-${(index % 5) + 1})`,
      };
      return config;
    }, {} as ChartConfig),
  } satisfies ChartConfig;

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <h3 className="font-semibold">Disease Probabilities</h3>
      </div>

      <div className="w-full overflow-hidden">
        <ChartContainer config={chartConfig} className="h-[400px] w-full">
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              left: 80,
              right: 40,
              top: 10,
              bottom: 10,
            }}
          >
            <YAxis
              dataKey="disease"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) =>
                chartConfig[value as keyof typeof chartConfig]?.label
              }
            />
            <XAxis dataKey="probability" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="probability" layout="vertical" radius={5}>
              <LabelList
                dataKey="probability"
                position="right"
                formatter={(value: number) => `${value.toFixed(1)}%`}
                style={{ fontSize: "12px", fill: "var(--muted-foreground)" }}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </div>
    </div>
  );
};
