import Header from "./components/Header/Header";
import Landscape from "./components/Landscape/Landscape";
import Footer from "./components/Footer/Footer";
import Hero from "./sections/Hero/Hero";
import Work from "./sections/Work/Work";
import Downloads from "./sections/Downloads/Downloads";
import Aidd from "./sections/Aidd/Aidd";
import Contact from "./sections/Contact/Contact";
import { useScrollTheme } from "./hooks/useScrollTheme";

export default function App() {
  useScrollTheme("home");

  return (
    <>
      <Landscape />

      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <Header />

      <main id="main">
        <Hero />
        <Work />
        <Downloads />
        <Aidd />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
