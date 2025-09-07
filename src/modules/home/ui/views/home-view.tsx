"use client";

import { Hero } from "../components/hero";
import { Overview } from "../components/overview";

export const HomeView = () => {
  return (
    <div className="app-container h-fit">
      <Hero />
      <Overview />
    </div>
  );
};
