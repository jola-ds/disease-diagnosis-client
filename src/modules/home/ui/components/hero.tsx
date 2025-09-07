import { Button } from "@/components/ui/button";
import { siteConfig } from "@/site.config";
import { GithubIcon } from "lucide-react";
import Link from "next/link";

export const Hero = () => {
  return (
    <header className="flex h-[60vh] flex-col items-center justify-center space-y-10">
      <div className="mx-auto max-w-2xl space-y-5 text-center">
        <h1 className="text-4xl font-bold">{siteConfig.name}</h1>
        <p className="text-muted-foreground text-lg">
          {siteConfig.description}
        </p>
      </div>
      <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
        <Button
          className="flex h-12 w-full rounded-full !px-5 shadow-none sm:w-fit"
          asChild
        >
          <Link href="/predict" prefetch>
            Start Predicting
          </Link>
        </Button>
        <Button
          variant="outline"
          className="border-primary flex h-12 w-full rounded-full !px-5 shadow-none sm:w-fit"
          asChild
        >
          <a
            href="https://github.com/jola-ds/disease-diagnosis"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GithubIcon />
            View on GitHub
          </a>
        </Button>
      </div>
    </header>
  );
};
