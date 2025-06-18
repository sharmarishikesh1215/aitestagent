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
    dropdown: ""
  });
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<string | null>(null);
  const [showAlert, setShowAlert] = useState(false);
  const [showSummaryInfo, setShowSummaryInfo] = useState(false);
  const [showAcInfo, setShowAcInfo] = useState(false);
  const [showDescInfo, setShowDescInfo] = useState(false);

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
        "https://rishi15121999.app.n8n.cloud/webhook/3a69e3e3-c44b-442d-abe5-6b34ff004eef",
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
      {/* Modern mini dropdown menu for Environment */}
      <div className="mb-6 flex items-center gap-2">  
        <span className="text-xs font-medium text-[#5b666d]">Type:</span>
        <MiniDropdown
          options={["Test Case", "Test Scenario"]}
          value={form.sheet}
          onChange={(val) => {
        setForm((f) => ({
          ...f,
          sheet: val,
          dropdown: val === "Test Case" ? "tc" : val === "Test Scenario" ? "ts" : ""
        }));
          }}
        />
      </div>
      {/* ↑ changed max-w-2xl to max-w-4xl for a wider form */}
      <h2 className="text-2xl font-bold text-neutral-800 dark:text-neutral-200">
        Test Info
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
                  (Output Sheet Should have Editor* Access for All)
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
                placeholder="SG"
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
            {/* Summary */}
            <LabelInputContainer>
              <CustomLabel htmlFor="summary">
                <span className="flex items-center gap-1 relative w-fit">
                  Summary
                  <button
                    type="button"
                    className="inline-flex items-center justify-center w-4 h-4 rounded-full transition-colors shadow text-white focus:outline-none focus:ring-2 focus:ring-f699fc"
                    tabIndex={0}
                    style={{
                      minWidth: "16px",
                      minHeight: "16px",
                      background:
                        "linear-gradient(135deg, #bfc3ce 0%, #a4a9b3 100%)",
                    }}
                    onMouseEnter={() => setShowSummaryInfo(true)}
                    onMouseLeave={() => setShowSummaryInfo(false)}
                    onFocus={() => setShowSummaryInfo(true)}
                    onBlur={() => setShowSummaryInfo(false)}
                  >
                    <span className="font text-[10px]" aria-hidden="true">
                      <i>i</i>
                    </span>
                  </button>
                  {showSummaryInfo && (
                    <div
                      className="absolute left-3/2 -translate-x-1/2 bottom-full mb-2 z-20 w-50 rounded-lg bg-white px-4 py-3 text-xs text-gray-800 shadow-lg border border-gray-100"
                      style={{
                        boxShadow:
                          "0 4px 16px 0 rgba(60,60,60,0.10), 0 1.5px 4px 0 rgba(60,60,60,0.08)",
                      }}
                    >
                      Write a concise summary of the test or ticket.
                    </div>
                  )}
                </span>
              </CustomLabel>
              <Input
                id="summary"
                name="summary"
                placeholder="Summary"
                type="text"
                value={form.summary}
                onChange={handleChange}
                className={inputClassName}
              />
            </LabelInputContainer>
            <LabelInputContainer>
              <CustomLabel htmlFor="module">Module*</CustomLabel>
              <Input
                id="module"
                name="module"
                placeholder="Gifting"
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
          {/* Acceptance Criteria */}
          <LabelInputContainer>
            <CustomLabel htmlFor="ac">
              <span className="flex items-center gap-1 relative w-fit">
                Acceptance Criteria*
                <button
                  type="button"
                  className="inline-flex items-center justify-center w-4 h-4 rounded-full transition-colors shadow text-white focus:outline-none focus:ring-2 focus:ring-f699fc"
                  tabIndex={0}
                  style={{
                    minWidth: "16px",
                    minHeight: "16px",
                    background:
                      "linear-gradient(135deg, #bfc3ce 0%, #a4a9b3 100%)",
                  }}
                  onMouseEnter={() => setShowAcInfo(true)}
                  onMouseLeave={() => setShowAcInfo(false)}
                  onFocus={() => setShowAcInfo(true)}
                  onBlur={() => setShowAcInfo(false)}
                >
                  <span className="font text-[10px]" aria-hidden="true">
                    <i>i</i>
                  </span>
                </button>
                {showAcInfo && (
                  <div
                    className="absolute left-3/2 -translate-x-1/2 bottom-full mb-2 z-20 w-50 rounded-lg bg-white px-4 py-3 text-xs text-gray-800 shadow-lg border border-gray-100"
                    style={{
                      boxShadow:
                        "0 4px 16px 0 rgba(60,60,60,0.10), 0 1.5px 4px 0 rgba(60,60,60,0.08)",
                    }}
                  >
                    Write a detailed acceptance criteria with failed test cases.
                  </div>
                )}
              </span>
            </CustomLabel>
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
          {/* Additional Info */}
          <LabelInputContainer>
            <CustomLabel htmlFor="desc">
              <span className="flex items-center gap-1 relative w-fit">
                Additional Info
                <button
                  type="button"
                  className="inline-flex items-center justify-center w-4 h-4 rounded-full transition-colors shadow text-white focus:outline-none focus:ring-2 focus:ring-f699fc"
                  tabIndex={0}
                  style={{
                    minWidth: "16px",
                    minHeight: "16px",
                    background:
                      "linear-gradient(135deg, #bfc3ce 0%, #a4a9b3 100%)",
                  }}
                  onMouseEnter={() => setShowDescInfo(true)}
                  onMouseLeave={() => setShowDescInfo(false)}
                  onFocus={() => setShowDescInfo(true)}
                  onBlur={() => setShowDescInfo(false)}
                >
                  <span className="font text-[10px]" aria-hidden="true">
                    <i>i</i>
                  </span>
                </button>
                {showDescInfo && (
                  <div
                    className="absolute left-3/2 -translate-x-1/2 bottom-full mb-2 z-20 w-50 rounded-lg bg-white px-4 py-3 text-xs text-gray-800 shadow-lg border border-gray-100"
                    style={{
                      boxShadow:
                        "0 4px 16px 0 rgba(60,60,60,0.10), 0 1.5px 4px 0 rgba(60,60,60,0.08)",
                    }}
                  >
                    Mention any additional specifications that you want the AI
                    model to take care of.
                  </div>
                )}
              </span>
            </CustomLabel>
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
                message =
                  "Please check google sheet link and give editor access to all.";
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

// MiniDropdown: a modern, sleek dropdown menu without using <select>
function MiniDropdown({
  options,
  value,
  onChange,
}: {
  options: string[];
  value: string;
  onChange: (val: string) => void;
}) {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        className="min-w-[120px] px-3 py-1.5 rounded-md border border-gray-300 bg-white text-xs text-[#5b666d] shadow-sm hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-[#f5f5f5] flex items-center justify-between gap-2 transition"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className="text-xs text-[#5b666d]">{value || "Select"}</span>
        <svg
          className={`w-4 h-4 ml-2 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <ul
          className="absolute z-10 mt-1 w-full rounded-md bg-white shadow-lg border border-gray-200 py-1 text-xs text-[#5b666d]"
          tabIndex={-1}
          role="listbox"
        >
          {options.map((opt) => (
            <li
              key={opt}
              className={`px-3 py-2 cursor-pointer hover:bg-cyan-50 ${
                value === opt ? "bg-cyan-100 font-semibold" : ""
              } text-xs text-[#5b666d]`}
              onClick={() => {
                onChange(opt);
                setOpen(false);
              }}
              role="option"
              aria-selected={value === opt}
            >
              {opt}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
