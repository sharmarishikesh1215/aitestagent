"use client";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import React from "react";

export function HoverBorderGradientDemo() {
  return (
    <div className="flex justify-center text-center">
      <HoverBorderGradient
        containerClassName="rounded-full"
        as="button"
        className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2 px-8 py-4 text-xl font-semibold"
        onClick={() => window.open("https://www.frugaltesting.com/book-a-meet", "_blank")}
      >
        {/* <AceternityLogo /> */}
        <span>Book a Meet</span>
      </HoverBorderGradient>
    </div>
  );
}

