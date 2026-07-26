import Header from "./components/Header/Header";
import Hero from "./sections/Hero/Hero";
import Work from "./sections/Work/Work";
import Aidd from "./sections/Aidd/Aidd";
import Contact from "./sections/Contact/Contact";

export default function App() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <Header />

      <main id="main">
        <Hero />
        <Work />
        <Aidd />
        <Contact />
      </main>
    </>
  );
}
