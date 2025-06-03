import Footer from "../components/Footer";
import { NavbarDemo } from "../components/Navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NavbarDemo />
      {children}
      <Footer />
    </>
  );
}