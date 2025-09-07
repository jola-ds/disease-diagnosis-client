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
import { PatientInput } from "../../types";

import { cn } from "@/lib/utils";
import { CheckSquare2Icon } from "lucide-react";
import { useMemo } from "react";
// Form validation schema
const predictFormSchema = z.object({
  age_band: z.enum(["0-4", "5-14", "15-24", "25-44", "45-64", "65+"]),
  gender: z.enum(["male", "female"]),
  setting: z.enum(["urban", "rural"]),
  region: z.enum(["north", "south", "east", "west", "middle_belt"]),
  season: z.enum(["dry", "rainy"]),
  fever: z.boolean(),
  headache: z.boolean(),
  cough: z.boolean(),
  fatigue: z.boolean(),
  body_ache: z.boolean(),
  chills: z.boolean(),
  sweats: z.boolean(),
  nausea: z.boolean(),
  vomiting: z.boolean(),
  diarrhea: z.boolean(),
  abdominal_pain: z.boolean(),
  loss_of_appetite: z.boolean(),
  sore_throat: z.boolean(),
  runny_nose: z.boolean(),
  dysuria: z.boolean(),
});

type PredictFormData = z.infer<typeof predictFormSchema>;

const symptoms = [
  { id: "fever", label: "Fever", description: "Elevated body temperature" },
  { id: "headache", label: "Headache", description: "Pain in the head" },
  { id: "cough", label: "Cough", description: "Persistent coughing" },
  { id: "fatigue", label: "Fatigue", description: "Extreme tiredness" },
  { id: "body_ache", label: "Body Ache", description: "General body pain" },
  { id: "chills", label: "Chills", description: "Feeling cold with shivering" },
  { id: "sweats", label: "Sweats", description: "Excessive sweating" },
  { id: "nausea", label: "Nausea", description: "Feeling of sickness" },
  {
    id: "vomiting",
    label: "Vomiting",
    description: "Forceful expulsion of stomach contents",
  },
  { id: "diarrhea", label: "Diarrhea", description: "Frequent loose stools" },
  {
    id: "abdominal_pain",
    label: "Abdominal Pain",
    description: "Pain in the stomach area",
  },
  {
    id: "loss_of_appetite",
    label: "Loss of Appetite",
    description: "Reduced desire to eat",
  },
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
    id: "dysuria",
    label: "Dysuria",
    description: "Painful or difficult urination",
  },
];

export const PredictForm = () => {
  const form = useForm<PredictFormData>({
    resolver: zodResolver(predictFormSchema),
    defaultValues: {
      age_band: "25-44",
      gender: "male",
      setting: "urban",
      region: "north",
      season: "dry",
      fever: false,
      headache: false,
      cough: false,
      fatigue: false,
      body_ache: false,
      chills: false,
      sweats: false,
      nausea: false,
      vomiting: false,
      diarrhea: false,
      abdominal_pain: false,
      loss_of_appetite: false,
      sore_throat: false,
      runny_nose: false,
      dysuria: false,
    },
  });

  const onSubmit = (data: PredictFormData) => {
    // Convert boolean values to 0/1 for API
    const apiData: PatientInput = {
      ...data,
      fever: data.fever ? 1 : 0,
      headache: data.headache ? 1 : 0,
      cough: data.cough ? 1 : 0,
      fatigue: data.fatigue ? 1 : 0,
      body_ache: data.body_ache ? 1 : 0,
      chills: data.chills ? 1 : 0,
      sweats: data.sweats ? 1 : 0,
      nausea: data.nausea ? 1 : 0,
      vomiting: data.vomiting ? 1 : 0,
      diarrhea: data.diarrhea ? 1 : 0,
      abdominal_pain: data.abdominal_pain ? 1 : 0,
      loss_of_appetite: data.loss_of_appetite ? 1 : 0,
      sore_throat: data.sore_throat ? 1 : 0,
      runny_nose: data.runny_nose ? 1 : 0,
      dysuria: data.dysuria ? 1 : 0,
    };

    console.log("Form submitted:", apiData);
    // TODO: Integrate with prediction API
  };

  const values = form.watch();

  const selectedSymptoms = useMemo(() => {
    return symptoms.filter(
      (symptom) => values[symptom.id as keyof PredictFormData],
    );
  }, [values]);

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <Card className="p-3">
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

                <div className="grid grid-cols-2 gap-6">
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
                            <SelectItem value="east">East</SelectItem>
                            <SelectItem value="west">West</SelectItem>
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
                  <div className="flex items-center space-x-2">
                    <h3 className="text-lg font-semibold">Symptoms</h3>
                    <Badge variant="outline">Select all that apply</Badge>
                  </div>
                  {selectedSymptoms.length > 0 && (
                    <Badge variant="secondary" className="mt-1 block">
                      {selectedSymptoms.length} selected
                    </Badge>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {symptoms.map((symptom) => {
                    const symptomKey = symptom.id as keyof Pick<
                      PredictFormData,
                      | "fever"
                      | "headache"
                      | "cough"
                      | "fatigue"
                      | "body_ache"
                      | "chills"
                      | "sweats"
                      | "nausea"
                      | "vomiting"
                      | "diarrhea"
                      | "abdominal_pain"
                      | "loss_of_appetite"
                      | "sore_throat"
                      | "runny_nose"
                      | "dysuria"
                    >;

                    return (
                      <FormField
                        key={symptom.id}
                        control={form.control}
                        name={symptomKey}
                        render={({ field }) => {
                          const toggleSymptom = () => {
                            field.onChange(!field.value);
                            // handleSymptomChange(symptom.id, !field.value);
                          };
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
                                  {field.value && (
                                    <CheckSquare2Icon
                                      className="absolute top-2 right-2 !m-0 size-5"
                                      strokeWidth={1.2}
                                    />
                                  )}
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
              </div>

              <Separator />

              {/* Submit Button */}
              <div className="flex justify-end space-x-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => form.reset()}
                >
                  Reset Form
                </Button>
                <Button type="submit" className="min-w-[120px]">
                  Predict Disease
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};
