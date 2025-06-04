import { HeroSectionOne } from "../components/Hero";
import { SignupFormDemo } from "../components/Signup";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4 py-8">
      <div className="flex-row md:flex-row w-full gap-8">
        {/* Left Section */}
        <div className="flex-1 flex items-center justify-center">
          <HeroSectionOne />
        </div>
        {/* Right Section */}
        <div className="flex-1 flex items-center justify-center">
          <SignupFormDemo />
        </div>
      </div>
    </main>
  );
}
