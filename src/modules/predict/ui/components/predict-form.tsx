import { Spinner } from "@/components/spinner";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { usePredictApi } from "../../hooks/use-predict-api";
import { PatientInput, PredictionResponse } from "../../types";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { cn } from "@/lib/utils";
import { AlertCircle, CheckCircleIcon, CircleIcon } from "lucide-react";
import { useMemo } from "react";

// Form validation schema
const predictFormSchema = z.object({
  age_band: z.enum(["0-4", "5-14", "15-24", "25-44", "45-64", "65+"]),
  gender: z.enum(["male", "female"]),
  setting: z.enum(["urban", "rural"]),
  region: z.enum(["north", "south", "middle_belt"]),
  season: z.enum(["dry", "rainy", "transition"]),

  // General symptoms
  fever: z.boolean(),
  headache: z.boolean(),
  cough: z.boolean(),
  chronic_cough: z.boolean(),
  productive_cough: z.boolean(),
  fatigue: z.boolean(),
  body_ache: z.boolean(),
  chills: z.boolean(),
  sweats: z.boolean(),
  night_sweats: z.boolean(),
  weight_loss: z.boolean(),
  loss_of_appetite: z.boolean(),

  // GI symptoms
  nausea: z.boolean(),
  vomiting: z.boolean(),
  diarrhea: z.boolean(),
  constipation: z.boolean(),
  abdominal_pain: z.boolean(),
  epigastric_pain: z.boolean(),
  heartburn: z.boolean(),
  hunger_pain: z.boolean(),

  // Respiratory symptoms
  sore_throat: z.boolean(),
  runny_nose: z.boolean(),
  chest_pain: z.boolean(),
  shortness_of_breath: z.boolean(),
  rapid_breathing: z.boolean(),
  hemoptysis: z.boolean(),

  // Genitourinary symptoms
  dysuria: z.boolean(),
  polyuria: z.boolean(),
  oliguria: z.boolean(),

  // Metabolic symptoms
  polydipsia: z.boolean(),
  polyphagia: z.boolean(),
  blurred_vision: z.boolean(),

  // Neurological symptoms
  dizziness: z.boolean(),
  confusion: z.boolean(),

  // Dermatological/Physical signs
  rash: z.boolean(),
  maculopapular_rash: z.boolean(),
  rose_spots: z.boolean(),
  conjunctivitis: z.boolean(),
  lymph_nodes: z.boolean(),

  // Infection-related symptoms
  recurrent_infections: z.boolean(),
  oral_thrush: z.boolean(),
});

type PredictFormData = z.infer<typeof predictFormSchema>;

const symptomGroups = [
  {
    id: "general",
    title: "General",
    description: "Common symptoms that may indicate various conditions",
    symptoms: [
      { id: "fever", label: "Fever", description: "Elevated body temperature" },
      { id: "headache", label: "Headache", description: "Pain in the head" },
      { id: "cough", label: "Cough", description: "Persistent coughing" },
      {
        id: "chronic_cough",
        label: "Chronic Cough",
        description: "Long-term persistent cough",
      },
      {
        id: "productive_cough",
        label: "Productive Cough",
        description: "Cough with phlegm or mucus",
      },
      { id: "fatigue", label: "Fatigue", description: "Extreme tiredness" },
      { id: "body_ache", label: "Body Ache", description: "General body pain" },
      {
        id: "chills",
        label: "Chills",
        description: "Feeling cold with shivering",
      },
      { id: "sweats", label: "Sweats", description: "Excessive sweating" },
      {
        id: "night_sweats",
        label: "Night Sweats",
        description: "Excessive sweating during sleep",
      },
      {
        id: "weight_loss",
        label: "Weight Loss",
        description: "Unintended weight reduction",
      },
      {
        id: "loss_of_appetite",
        label: "Loss of Appetite",
        description: "Reduced desire to eat",
      },
    ],
  },
  {
    id: "gastrointestinal",
    title: "Gastrointestinal",
    description: "Symptoms related to the digestive system",
    symptoms: [
      { id: "nausea", label: "Nausea", description: "Feeling of sickness" },
      {
        id: "vomiting",
        label: "Vomiting",
        description: "Forceful expulsion of stomach contents",
      },
      {
        id: "diarrhea",
        label: "Diarrhea",
        description: "Frequent loose stools",
      },
      {
        id: "constipation",
        label: "Constipation",
        description: "Difficulty in bowel movements",
      },
      {
        id: "abdominal_pain",
        label: "Abdominal Pain",
        description: "Pain in the stomach area",
      },
      {
        id: "epigastric_pain",
        label: "Epigastric Pain",
        description: "Pain in upper abdomen",
      },
      {
        id: "heartburn",
        label: "Heartburn",
        description: "Burning sensation in chest",
      },
      {
        id: "hunger_pain",
        label: "Hunger Pain",
        description: "Pain when stomach is empty",
      },
    ],
  },
  {
    id: "respiratory",
    title: "Respiratory",
    description: "Symptoms related to breathing and the respiratory system",
    symptoms: [
      {
        id: "sore_throat",
        label: "Sore Throat",
        description: "Pain or irritation in the throat",
      },
      {
        id: "runny_nose",
        label: "Runny Nose",
        description: "Excessive nasal discharge",
      },
      {
        id: "chest_pain",
        label: "Chest Pain",
        description: "Pain in the chest area",
      },
      {
        id: "shortness_of_breath",
        label: "Shortness of Breath",
        description: "Difficulty breathing",
      },
      {
        id: "rapid_breathing",
        label: "Rapid Breathing",
        description: "Fast breathing rate",
      },
      {
        id: "hemoptysis",
        label: "Hemoptysis",
        description: "Coughing up blood",
      },
    ],
  },
  {
    id: "genitourinary",
    title: "Genitourinary",
    description: "Symptoms related to the urinary and reproductive systems",
    symptoms: [
      {
        id: "dysuria",
        label: "Dysuria",
        description: "Painful or difficult urination",
      },
      { id: "polyuria", label: "Polyuria", description: "Excessive urination" },
      {
        id: "oliguria",
        label: "Oliguria",
        description: "Reduced urine output",
      },
    ],
  },
  {
    id: "metabolic",
    title: "Metabolic",
    description: "Symptoms related to metabolism and blood sugar regulation",
    symptoms: [
      {
        id: "polydipsia",
        label: "Polydipsia",
        description: "Excessive thirst",
      },
      {
        id: "polyphagia",
        label: "Polyphagia",
        description: "Excessive hunger",
      },
      {
        id: "blurred_vision",
        label: "Blurred Vision",
        description: "Unclear or fuzzy vision",
      },
    ],
  },
  {
    id: "neurological",
    title: "Neurological",
    description: "Symptoms related to the nervous system and brain function",
    symptoms: [
      {
        id: "dizziness",
        label: "Dizziness",
        description: "Feeling of lightheadedness",
      },
      {
        id: "confusion",
        label: "Confusion",
        description: "Mental disorientation",
      },
    ],
  },
  {
    id: "dermatological",
    title: "Dermatological & Physical Signs",
    description: "Visible symptoms and physical signs on the skin and body",
    symptoms: [
      { id: "rash", label: "Rash", description: "Skin irritation or eruption" },
      {
        id: "maculopapular_rash",
        label: "Maculopapular Rash",
        description: "Flat and raised skin lesions",
      },
      {
        id: "rose_spots",
        label: "Rose Spots",
        description: "Small pink spots on skin",
      },
      {
        id: "conjunctivitis",
        label: "Conjunctivitis",
        description: "Inflammation of the eye",
      },
      {
        id: "lymph_nodes",
        label: "Lymph Nodes",
        description: "Swollen lymph nodes",
      },
    ],
  },
  {
    id: "infectious",
    title: "Infection-Related",
    description: "Symptoms that may indicate infectious diseases",
    symptoms: [
      {
        id: "recurrent_infections",
        label: "Recurrent Infections",
        description: "Frequent infections",
      },
      {
        id: "oral_thrush",
        label: "Oral Thrush",
        description: "Fungal infection in mouth",
      },
    ],
  },
];

// Flatten all symptoms for the selectedSymptoms calculation
const allSymptoms = symptomGroups.flatMap((group) => group.symptoms);

interface PredictFormProps {
  onPredictionResult?: (result: PredictionResponse | null) => void;
  onReset?: () => void;
}

export const PredictForm = ({
  onPredictionResult,
  onReset,
}: PredictFormProps) => {
  const { predictMutation } = usePredictApi();

  const form = useForm<PredictFormData>({
    resolver: zodResolver(predictFormSchema),
    defaultValues: {
      age_band: "25-44",
      gender: "male",
      setting: "urban",
      region: "north",
      season: "dry",

      // General symptoms
      fever: false,
      headache: false,
      cough: false,
      chronic_cough: false,
      productive_cough: false,
      fatigue: false,
      body_ache: false,
      chills: false,
      sweats: false,
      night_sweats: false,
      weight_loss: false,
      loss_of_appetite: false,

      // GI symptoms
      nausea: false,
      vomiting: false,
      diarrhea: false,
      constipation: false,
      abdominal_pain: false,
      epigastric_pain: false,
      heartburn: false,
      hunger_pain: false,

      // Respiratory symptoms
      sore_throat: false,
      runny_nose: false,
      chest_pain: false,
      shortness_of_breath: false,
      rapid_breathing: false,
      hemoptysis: false,

      // Genitourinary symptoms
      dysuria: false,
      polyuria: false,
      oliguria: false,

      // Metabolic symptoms
      polydipsia: false,
      polyphagia: false,
      blurred_vision: false,

      // Neurological symptoms
      dizziness: false,
      confusion: false,

      // Dermatological/Physical signs
      rash: false,
      maculopapular_rash: false,
      rose_spots: false,
      conjunctivitis: false,
      lymph_nodes: false,

      // Infection-related symptoms
      recurrent_infections: false,
      oral_thrush: false,
    },
  });

  const onSubmit = async (data: PredictFormData) => {
    // Convert boolean values to 0/1 for API
    const apiData: PatientInput = {
      ...data,
      // General symptoms
      fever: data.fever ? 1 : 0,
      headache: data.headache ? 1 : 0,
      cough: data.cough ? 1 : 0,
      chronic_cough: data.chronic_cough ? 1 : 0,
      productive_cough: data.productive_cough ? 1 : 0,
      fatigue: data.fatigue ? 1 : 0,
      body_ache: data.body_ache ? 1 : 0,
      chills: data.chills ? 1 : 0,
      sweats: data.sweats ? 1 : 0,
      night_sweats: data.night_sweats ? 1 : 0,
      weight_loss: data.weight_loss ? 1 : 0,
      loss_of_appetite: data.loss_of_appetite ? 1 : 0,

      // GI symptoms
      nausea: data.nausea ? 1 : 0,
      vomiting: data.vomiting ? 1 : 0,
      diarrhea: data.diarrhea ? 1 : 0,
      constipation: data.constipation ? 1 : 0,
      abdominal_pain: data.abdominal_pain ? 1 : 0,
      epigastric_pain: data.epigastric_pain ? 1 : 0,
      heartburn: data.heartburn ? 1 : 0,
      hunger_pain: data.hunger_pain ? 1 : 0,

      // Respiratory symptoms
      sore_throat: data.sore_throat ? 1 : 0,
      runny_nose: data.runny_nose ? 1 : 0,
      chest_pain: data.chest_pain ? 1 : 0,
      shortness_of_breath: data.shortness_of_breath ? 1 : 0,
      rapid_breathing: data.rapid_breathing ? 1 : 0,
      hemoptysis: data.hemoptysis ? 1 : 0,

      // Genitourinary symptoms
      dysuria: data.dysuria ? 1 : 0,
      polyuria: data.polyuria ? 1 : 0,
      oliguria: data.oliguria ? 1 : 0,

      // Metabolic symptoms
      polydipsia: data.polydipsia ? 1 : 0,
      polyphagia: data.polyphagia ? 1 : 0,
      blurred_vision: data.blurred_vision ? 1 : 0,

      // Neurological symptoms
      dizziness: data.dizziness ? 1 : 0,
      confusion: data.confusion ? 1 : 0,

      // Dermatological/Physical signs
      rash: data.rash ? 1 : 0,
      maculopapular_rash: data.maculopapular_rash ? 1 : 0,
      rose_spots: data.rose_spots ? 1 : 0,
      conjunctivitis: data.conjunctivitis ? 1 : 0,
      lymph_nodes: data.lymph_nodes ? 1 : 0,

      // Infection-related symptoms
      recurrent_infections: data.recurrent_infections ? 1 : 0,
      oral_thrush: data.oral_thrush ? 1 : 0,
    };

    try {
      const result = await predictMutation.mutateAsync(apiData);
      onPredictionResult?.(result);
    } catch (error) {
      console.error("Prediction failed:", error);
      onPredictionResult?.(null);
    }
  };

  const values = form.watch();

  const selectedSymptoms = useMemo(() => {
    return allSymptoms.filter(
      (symptom) => values[symptom.id as keyof PredictFormData],
    );
  }, [values]);

  return (
    <div className="space-y-6">
      <Card className="p-3 sm:p-5">
        <CardHeader className="p-0">
          <CardTitle className="text-lg font-semibold">
            Disease Prediction Form
          </CardTitle>
          <CardDescription>
            Please provide patient demographics and symptoms for disease
            prediction
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {/* Demographics Section */}
              <div className="space-y-6">
                <div className="flex items-center space-x-2">
                  <h3 className="font-semibold">Patient Demographics</h3>
                  <Badge variant="outline">Required</Badge>
                </div>

                <div className="grid grid-cols-1 gap-4 min-[360px]:grid-cols-2">
                  {/* Age Band */}
                  <FormField
                    control={form.control}
                    name="age_band"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Age Band</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select age band" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="0-4">0-4 years</SelectItem>
                            <SelectItem value="5-14">5-14 years</SelectItem>
                            <SelectItem value="15-24">15-24 years</SelectItem>
                            <SelectItem value="25-44">25-44 years</SelectItem>
                            <SelectItem value="45-64">45-64 years</SelectItem>
                            <SelectItem value="65+">65+ years</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Gender */}
                  <FormField
                    control={form.control}
                    name="gender"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Gender</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select gender" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Setting */}
                  <FormField
                    control={form.control}
                    name="setting"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Setting</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select setting" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="urban">Urban</SelectItem>
                            <SelectItem value="rural">Rural</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Region */}
                  <FormField
                    control={form.control}
                    name="region"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Region</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select region" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="north">North</SelectItem>
                            <SelectItem value="south">South</SelectItem>
                            <SelectItem value="middle_belt">
                              Middle Belt
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Season */}
                  <FormField
                    control={form.control}
                    name="season"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Season</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select season" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="dry">Dry Season</SelectItem>
                            <SelectItem value="rainy">Rainy Season</SelectItem>
                            <SelectItem value="transition">
                              Transition Season
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <Separator />

              {/* Symptoms Section */}
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap items-center space-x-2">
                    <h3 className="text-lg font-semibold">Symptoms</h3>
                    <Badge variant="outline">Select all that apply</Badge>
                  </div>
                  {selectedSymptoms.length > 0 && (
                    <Badge variant="secondary" className="mt-1 block">
                      {selectedSymptoms.length} selected
                    </Badge>
                  )}
                </div>

                <Accordion type="multiple" className="w-full">
                  {symptomGroups.map((group) => (
                    <AccordionItem key={group.id} value={group.id}>
                      <AccordionTrigger className="text-left">
                        <div className="flex flex-col items-start">
                          <span className="font-medium">{group.title}</span>
                          <span className="text-muted-foreground text-sm font-normal">
                            {group.symptoms
                              .map((symptom) => symptom.label)
                              .join(", ")}
                          </span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="grid grid-cols-1 gap-4 min-[360px]:grid-cols-2">
                          {group.symptoms.map((symptom) => {
                            const symptomKey = symptom.id as keyof Pick<
                              PredictFormData,
                              | "fever"
                              | "headache"
                              | "cough"
                              | "chronic_cough"
                              | "productive_cough"
                              | "fatigue"
                              | "body_ache"
                              | "chills"
                              | "sweats"
                              | "night_sweats"
                              | "weight_loss"
                              | "loss_of_appetite"
                              | "nausea"
                              | "vomiting"
                              | "diarrhea"
                              | "constipation"
                              | "abdominal_pain"
                              | "epigastric_pain"
                              | "heartburn"
                              | "hunger_pain"
                              | "sore_throat"
                              | "runny_nose"
                              | "chest_pain"
                              | "shortness_of_breath"
                              | "rapid_breathing"
                              | "hemoptysis"
                              | "dysuria"
                              | "polyuria"
                              | "oliguria"
                              | "polydipsia"
                              | "polyphagia"
                              | "blurred_vision"
                              | "dizziness"
                              | "confusion"
                              | "rash"
                              | "maculopapular_rash"
                              | "rose_spots"
                              | "conjunctivitis"
                              | "lymph_nodes"
                              | "recurrent_infections"
                              | "oral_thrush"
                            >;

                            return (
                              <FormField
                                key={symptom.id}
                                control={form.control}
                                name={symptomKey}
                                render={({ field }) => {
                                  const toggleSymptom = () => {
                                    field.onChange(!field.value);
                                  };
                                  const Icon = field.value
                                    ? CheckCircleIcon
                                    : CircleIcon;
                                  return (
                                    <FormItem>
                                      <FormControl>
                                        <div
                                          className={cn(
                                            "relative flex w-full flex-row items-start space-y-0 space-x-3 rounded-md border p-4",
                                            {
                                              "border-primary bg-primary/3":
                                                field.value,
                                            },
                                          )}
                                          onClick={toggleSymptom}
                                        >
                                          <Icon
                                            className={cn(
                                              "text-muted-foreground/70 absolute top-1.5 right-1.5 !m-0 size-5",
                                              {
                                                "text-primary": field.value,
                                              },
                                            )}
                                            strokeWidth={1}
                                          />
                                          <div className="space-y-1 leading-none">
                                            <FormLabel className="text-sm font-medium">
                                              {symptom.label}
                                            </FormLabel>
                                            <FormDescription className="text-muted-foreground text-xs">
                                              {symptom.description}
                                            </FormDescription>
                                          </div>
                                        </div>
                                      </FormControl>
                                    </FormItem>
                                  );
                                }}
                              />
                            );
                          })}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>

              <Separator />

              {/* Submit Button */}
              <div className="flex flex-col gap-4 min-[360px]:flex-row min-[360px]:justify-end">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    form.reset();
                    onReset?.();
                  }}
                  disabled={predictMutation.isPending}
                >
                  Reset Form
                </Button>
                <Button
                  type="submit"
                  className="min-w-[120px]"
                  disabled={predictMutation.isPending}
                >
                  {predictMutation.isPending ? (
                    <>
                      <Spinner className="size-4" />
                      Predicting...
                    </>
                  ) : (
                    "Predict Disease"
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      {/* Error Display */}
      {predictMutation.isError && (
        <Card className="border-destructive">
          <CardContent className="pt-6">
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Failed to predict disease. Please try again.
                {predictMutation.error?.message && (
                  <div className="mt-2 text-sm">
                    Error: {predictMutation.error.message}
                  </div>
                )}
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
