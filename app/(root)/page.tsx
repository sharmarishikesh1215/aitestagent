import Footer from "../components/Footer";
import { HeroSectionOne } from "../components/Hero";
import { SignupFormDemo } from "../components/Signup";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4 py-8">
      <div className="flex flex-col md:flex-row w-full max-w-6xl gap-8">
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
