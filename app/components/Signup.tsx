"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
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
        "https://natasha1.app.n8n.cloud/webhook-test/324ee735-2fbb-42c6-abc1-7605fba371a2",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );
      const data = await res.json();
      setResponse(JSON.stringify(data));
    } catch (err) {
      setResponse("Error submitting form.");
    }
    setLoading(false);
  };

  return (
    <div className="shadow-input mx-auto w-full max-w-2xl rounded-none bg-white p-8 md:rounded-2xl md:p-12 dark:bg-black">
      <h2 className="text-2xl font-bold text-neutral-800 dark:text-neutral-200">
        User Story
      </h2>
      <form className="my-8" onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row gap-4">
          {/* Left column */}
          <div className="flex-1 flex flex-col gap-4">
            <LabelInputContainer>
              <Label htmlFor="os">Google Sheet Link*</Label>
              <Input
                id="os"
                name="os"
                placeholder="Google Sheet URL"
                type="text"
                value={form.os}
                onChange={handleChange}
                required
              />
            </LabelInputContainer>
            <LabelInputContainer>
              <Label htmlFor="sheet">Sheet*</Label>
              <Input
                id="sheet"
                name="sheet"
                placeholder="Sheet1"
                type="text"
                value={form.sheet}
                onChange={handleChange}
                required
              />
            </LabelInputContainer>
            <LabelInputContainer>
              <Label htmlFor="ticketId">Ticket ID*</Label>
              <Input
                id="ticketId"
                name="ticketId"
                placeholder="PC01"
                type="text"
                value={form.ticketId}
                onChange={handleChange}
                required
              />
            </LabelInputContainer>
            <LabelInputContainer>
              <Label htmlFor="module">Module*</Label>
              <Input
                id="module"
                name="module"
                placeholder="Order"
                type="text"
                value={form.module}
                onChange={handleChange}
                required
              />
            </LabelInputContainer>
          </div>
          {/* Right column */}
          <div className="flex-1 flex flex-col gap-4">
            <LabelInputContainer>
              <Label htmlFor="summary">Summary*</Label>
              <Input
                id="summary"
                name="summary"
                placeholder="Summary"
                type="text"
                value={form.summary}
                onChange={handleChange}
                required
              />
            </LabelInputContainer>
            <LabelInputContainer>
              <Label htmlFor="ac">Acceptance Criteria*</Label>
              <textarea
                id="ac"
                name="ac"
                placeholder="Acceptance Criteria"
                className="w-full rounded-md border border-gray-300 p-2 dark:bg-zinc-900 dark:text-white resize-none"
                rows={3}
                value={form.ac}
                onChange={handleChange}
                required
              />
            </LabelInputContainer>
            <LabelInputContainer>
              <Label htmlFor="desc">Description*</Label>
              <textarea
                id="desc"
                name="desc"
                placeholder="Description"
                className="w-full rounded-md border border-gray-300 p-2 dark:bg-zinc-900 dark:text-white resize-none"
                rows={4}
                value={form.desc}
                onChange={handleChange}
                required
              />
            </LabelInputContainer>
          </div>
        </div>
        <button
          className="group/btn relative mt-8 block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset]"
          type="submit"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit"}
          <BottomGradient />
        </button>
        {response && (
          <div className="mt-4 text-sm text-center text-green-600 dark:text-green-400">
            {response}
          </div>
        )}
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
