import { Button } from "@/components/ui/button";
import Link from "next/link";

export const Hero = () => {
  return (
    <header className="flex flex-col items-center justify-center space-y-10 py-36">
      <div className="mx-auto max-w-2xl space-y-5 text-center">
        <h1 className="text-4xl font-bold">Disease Diagnosis AI</h1>
        <p className="text-muted-foreground text-lg">
          AI-Powered Disease Prediction for Nigerian Healthcare.
        </p>
      </div>
      <div className="flex items-center gap-3">
        <Button
          className="flex h-12 w-full rounded-full !px-5 sm:w-fit"
          asChild
        >
          <Link href="/predict" prefetch>
            Start Predicting
          </Link>
        </Button>
      </div>
    </header>
  );
};
