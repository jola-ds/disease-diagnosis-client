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
    .filter(([, probability]) => probability >= 0.001) // Filter out diseases with less than 0.1% probability
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

  // Calculate responsive height based on number of diseases
  const barHeight = 40; // Fixed bar height
  const padding = 40; // Top and bottom padding
  const chartHeight = Math.max(200, chartData.length * barHeight + padding);

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

      <div className="w-[calc(100vw-82px)] overflow-x-auto">
        <div className="min-w-[300px]">
          <ChartContainer
            config={chartConfig}
            className="w-full min-w-[300px]"
            style={{ height: `${chartHeight}px` }}
          >
            <BarChart
              accessibilityLayer
              data={chartData}
              layout="vertical"
              margin={{
                left: 60,
                right: 40,
                top: 20,
                bottom: 20,
              }}
            >
              <YAxis
                dataKey="disease"
                type="category"
                tickLine={false}
                tickMargin={8}
                axisLine={false}
                width={70}
                tickFormatter={(value) => {
                  const label =
                    chartConfig[value as keyof typeof chartConfig]?.label;
                  // Truncate long labels and add ellipsis
                  return label && label.length > 15
                    ? `${label.substring(0, 15)}...`
                    : label;
                }}
              />
              <XAxis dataKey="probability" type="number" hide />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Bar
                dataKey="probability"
                layout="vertical"
                radius={5}
                maxBarSize={40}
              >
                <LabelList
                  dataKey="probability"
                  position="right"
                  formatter={(value: number) => `${value.toFixed(1)}%`}
                  style={{
                    fontSize: "12px",
                    fill: "var(--muted-foreground)",
                  }}
                />
              </Bar>
            </BarChart>
          </ChartContainer>
        </div>
      </div>
    </div>
  );
};
