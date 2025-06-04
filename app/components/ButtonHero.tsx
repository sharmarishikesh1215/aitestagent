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
        onClick={() =>
          window.open(
            "https://docs.google.com/spreadsheets/d/1AyZ-NfjDVHGfS1vuaGxLTn12O1uXetTfWxZ9DRQTaKg/edit?gid=0#gid=0",
            "_blank"
          )
        }
      >
        {/* <AceternityLogo /> */}
        <span className="flex items-center gap-2">
          Free Formatted Sheet
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 48 48" fill="none">
            <rect width="48" height="48" rx="8" fill="#0F9D58"/>
            <path d="M16 14C16 12.8954 16.8954 12 18 12H30C31.1046 12 32 12.8954 32 14V34C32 35.1046 31.1046 36 30 36H18C16.8954 36 16 35.1046 16 34V14Z" fill="white"/>
            <rect x="20" y="18" width="8" height="2" rx="1" fill="#0F9D58"/>
            <rect x="20" y="22" width="8" height="2" rx="1" fill="#0F9D58"/>
            <rect x="20" y="26" width="8" height="2" rx="1" fill="#0F9D58"/>
          </svg>
        </span>
      </HoverBorderGradient>
    </div>
  );
}

