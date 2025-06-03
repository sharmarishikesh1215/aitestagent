import { HeroSectionOne } from "../components/Hero";
import { NavbarDemo } from "../components/Navbar";


export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <NavbarDemo />
      <HeroSectionOne />
    </main>
  );
}
