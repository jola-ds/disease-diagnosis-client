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
  // Function to generate color variations based on primary color
  const generateColorVariation = (index: number, total: number) => {
    if (index === 0) {
      return "var(--primary)"; // Highest bar gets primary color
    }

    // Calculate opacity/intensity for other bars (decreasing from 0.8 to 0.2)
    const intensity = Math.max(0.2, 0.8 - (index / (total - 1)) * 0.6);

    // Return primary color with reduced opacity
    return `color-mix(in oklch, var(--primary) ${intensity * 100}%, transparent)`;
  };

  // Prepare chart data from prediction results
  const chartData = Object.entries(predictionResult.all_probabilities)
    .filter(([, probability]) => probability >= 0.001) // Filter out diseases with less than 0.1% probability
    .sort(([, a], [, b]) => b - a)
    .map(([disease, probability], index) => ({
      disease: disease.replace(/_/g, " ").toUpperCase(),
      probability: probability * 100,
      fill: generateColorVariation(
        index,
        Object.entries(predictionResult.all_probabilities).filter(
          ([, p]) => p >= 0.001,
        ).length,
      ),
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
        color: generateColorVariation(index, chartData.length),
      };
      return config;
    }, {} as ChartConfig),
  } satisfies ChartConfig;

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <h3 className="font-semibold">Disease Probabilities</h3>
      </div>

      <div className="max-w-full overflow-x-auto">
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
