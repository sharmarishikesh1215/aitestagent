"use client";
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea"; // <-- Add this import
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export function SignupFormDemo() {
  const [form, setForm] = useState({
    os: "",
    sheet: "",
    ticketId: "",
    module: "",
    summary: "",
    ac: "",
    desc: "",
  });
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<string | null>(null);
  const [showAlert, setShowAlert] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setResponse(null);
    try {
      const res = await fetch(
        "https://natasha1.app.n8n.cloud/webhook/324ee735-2fbb-42c6-abc1-7605fba371a2",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );
      const data = await res.json();
      setResponse(JSON.stringify(data));
      setShowAlert(true);
    } catch {
      setResponse("Error submitting form.");
      setShowAlert(true);
    }
    setLoading(false);
  };

  // Hide alert after 3 seconds
  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => setShowAlert(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showAlert]);

  // Add this style to all Input and textarea fields for consistent, smaller placeholder size
  const inputClassName = "text-sm placeholder:text-sm";

  return (
    <div className="shadow-input mx-auto w-full max-w-4xl rounded-none bg-white p-8 md:rounded-2xl md:p-12 dark:bg-black">
      {/* ↑ changed max-w-2xl to max-w-4xl for a wider form */}
      <h2 className="text-2xl font-bold text-neutral-800 dark:text-neutral-200">
        Feature Info
      </h2>
      <form className="my-8" onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row gap-4">
          {/* Left column */}
          <div className="flex-1 flex flex-col gap-4">
            <LabelInputContainer>
              <CustomLabel htmlFor="os">
                Google Sheet Link*
                <br />
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  (Output Sheet Should have Edit* Access for All)
                </span>
              </CustomLabel>
              <Input
                id="os"
                name="os"
                placeholder="Google Sheet URL"
                type="text"
                value={form.os}
                onChange={handleChange}
                required
                className={inputClassName}
              />
            </LabelInputContainer>

            <LabelInputContainer>
              <CustomLabel htmlFor="ticketId">Ticket ID*</CustomLabel>
              <Input
                id="ticketId"
                name="ticketId"
                placeholder="PC01"
                type="text"
                value={form.ticketId}
                onChange={handleChange}
                required
                className={inputClassName}
              />
            </LabelInputContainer>
          </div>
          {/* Right column */}
          <div className="flex-1 flex flex-col gap-4 mt-4">
            <LabelInputContainer>
              <CustomLabel htmlFor="sheet">Sheet Tab Link*</CustomLabel>
              <Input
                id="sheet"
                name="sheet"
                placeholder="Link to Sheet Tab"
                type="text"
                value={form.sheet}
                onChange={handleChange}
                required
                className={inputClassName}
              />
            </LabelInputContainer>
            <LabelInputContainer>
              <CustomLabel htmlFor="module">Module*</CustomLabel>
              <Input
                id="module"
                name="module"
                placeholder="Order"
                type="text"
                value={form.module}
                onChange={handleChange}
                required
                className={inputClassName}
              />
            </LabelInputContainer>
          </div>
        </div>
        <div className="mt-6 flex flex-col space-y-3">
          <LabelInputContainer>
            <CustomLabel htmlFor="summary">Summary*</CustomLabel>
            <Input
              id="summary"
              name="summary"
              placeholder="Summary"
              type="text"
              value={form.summary}
              onChange={handleChange}
              required
              className={inputClassName}
            />
          </LabelInputContainer>
          <LabelInputContainer>
            <CustomLabel htmlFor="ac">Acceptance Criteria*</CustomLabel>
            <Textarea
              id="ac"
              name="ac"
              placeholder="Acceptance Criteria"
              className={cn(
                "h-[130px] w-full rounded-md border border-gray-300 focus:border-black focus:ring-2 focus:ring-black dark:bg-zinc-900 dark:text-white resize-none transition-colors",
                inputClassName
              )}
              value={form.ac}
              onChange={handleChange}
              required
            />
          </LabelInputContainer>
          <LabelInputContainer>
            <CustomLabel htmlFor="desc">Description</CustomLabel>
            <Textarea
              id="desc"
              name="desc"
              placeholder="Description"
              className={cn("h-[130px] w-full resize-none", inputClassName)}
              value={form.desc}
              onChange={handleChange}
            />
          </LabelInputContainer>
        </div>
        <button
          className="cursor-pointer group/btn relative mt-8 block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset]"
          type="submit"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit"}
          <BottomGradient />
        </button>
        {response &&
          showAlert &&
          (() => {
            let message = "";
            let isError = false;

            try {
              const parsed = JSON.parse(response);
              // If response is {"message":"Error in workflow"}
              if (
                typeof parsed === "object" &&
                parsed !== null &&
                parsed.message === "Error in workflow"
              ) {
                message = "Please check all of the fields";
                isError = true;
              } else if (
                response &&
                response !== "null" &&
                response.trim() !== ""
              ) {
                message = "Sheet is Updated!";
              } else {
                message = "No response received.";
                isError = true;
              }
            } catch {
              // If response is not JSON, fallback
              if (response && response !== "null" && response.trim() !== "") {
                message = "Sheet is Updated!";
              } else {
                message = "No response received.";
                isError = true;
              }
            }

            return (
              <div
                role="alert"
                className={`alert mt-4 ${
                  isError
                    ? "bg-red-100 text-red-700 border border-red-200"
                    : "alert-success"
                }`}
                style={
                  isError
                    ? { backgroundColor: "#ffe5e5", color: "#b91c1c" }
                    : {}
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 shrink-0 stroke-current"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d={
                      isError
                        ? "M6 18L18 6M6 6l12 12"
                        : "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    }
                  />
                </svg>
                <span>{message}</span>
              </div>
            );
          })()}
      </form>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
      <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex w-full flex-col space-y-2", className)}>
      {children}
    </div>
  );
};

// If you control the Label component, you can add these styles there.
// Otherwise, override the Label style here:
const CustomLabel = (props: React.ComponentProps<typeof Label>) => (
  <Label
    {...props}
    className={cn(
      "text-[#5b666d] text-xs font-medium", // custom color and smaller size
      props.className
    )}
  />
);
