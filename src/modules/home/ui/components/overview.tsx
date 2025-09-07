import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

export const Overview = () => {
  const features = [
    {
      icon: "🎯",
      title: "High Accuracy",
      description: "74.6% overall accuracy with XGBoost classifier",
      highlight: "74.6%",
    },
    {
      icon: "🏥",
      title: "10 Diseases",
      description: "Malaria, Typhoid, TB, Measles, and more",
      highlight: "10+",
    },
    {
      icon: "📊",
      title: "Real-time Predictions",
      description: "Instant diagnosis with confidence scores",
      highlight: "Instant",
    },
    {
      icon: (
        <Image
          src="/images/nigeria.svg"
          alt="Nigerian Flag"
          width={40}
          height={40}
          className="mx-auto inline-block"
        />
      ),
      title: "Nigerian Focus",
      description: "Designed for low-resource healthcare settings",
      highlight: "Nigeria",
    },
  ];

  const diseases = [
    "Malaria",
    "Typhoid",
    "Tuberculosis",
    "Measles",
    "Cholera",
    "Dengue",
    "Hepatitis",
    "Pneumonia",
    "Meningitis",
    "Yellow Fever",
  ];

  return (
    <section className="from-background to-muted/20 bg-gradient-to-b py-16">
      <div className="container mx-auto px-4">
        {/* Project Description */}
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold">Project Overview</h2>
          <p className="text-muted-foreground mx-auto max-w-4xl text-lg leading-relaxed">
            This AI-powered disease diagnosis system is designed to support
            healthcare workers in low-resource settings, particularly in
            Nigeria. Using machine learning and synthetic data that reflects
            real epidemiological patterns, the system can predict 10 common
            diseases based on patient demographics and symptoms.
          </p>
        </div>

        {/* Key Features Grid */}
        <div className="mb-16 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="text-center transition-shadow hover:shadow-lg"
            >
              <CardHeader className="pb-3">
                <div className="mb-2 text-center text-4xl">{feature.icon}</div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-2 text-sm">
                  {feature.description}
                </CardDescription>
                <Badge variant="secondary" className="font-semibold">
                  {feature.highlight}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Supported Diseases */}
        <Card className="mb-16">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Supported Diseases</CardTitle>
            <CardDescription>
              Our AI model can predict these common diseases based on symptoms
              and demographics
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap justify-center gap-2">
              {diseases.map((disease, index) => (
                <Badge key={index} variant="outline" className="px-3 py-1">
                  {disease}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* How It Works */}
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">How It Works</CardTitle>
            <CardDescription>
              Simple three-step process for accurate disease prediction
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <div className="text-center">
                <div className="bg-primary text-primary-foreground mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full text-xl font-bold">
                  1
                </div>
                <h3 className="mb-2 font-semibold">Enter Patient Info</h3>
                <p className="text-muted-foreground text-sm">
                  Input patient demographics, symptoms, and medical history
                </p>
              </div>
              <div className="text-center">
                <div className="bg-primary text-primary-foreground mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full text-xl font-bold">
                  2
                </div>
                <h3 className="mb-2 font-semibold">AI Analysis</h3>
                <p className="text-muted-foreground text-sm">
                  Our XGBoost model processes the data and generates predictions
                </p>
              </div>
              <div className="text-center">
                <div className="bg-primary text-primary-foreground mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full text-xl font-bold">
                  3
                </div>
                <h3 className="mb-2 font-semibold">Get Results</h3>
                <p className="text-muted-foreground text-sm">
                  Receive instant diagnosis with confidence scores and
                  recommendations
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
