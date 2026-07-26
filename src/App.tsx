import { useCallback, useEffect, useState } from "react";
import Header from "./components/Header/Header";
import Hero from "./sections/Hero/Hero";
import Work from "./sections/Work/Work";
import Aidd from "./sections/Aidd/Aidd";
import ContactPage from "./pages/ContactPage/ContactPage";

export default function App() {
  const [showContact, setShowContact] = useState(() => location.hash === "#contact");

  useEffect(() => {
    const onChange = () => setShowContact(location.hash === "#contact");
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, []);

  const openContact = useCallback(() => {
    location.hash = "#contact";
    setShowContact(true);
  }, []);

  const closeContact = useCallback(() => {
    location.hash = "#home";
    setShowContact(false);
  }, []);

  if (showContact) return <ContactPage onClose={closeContact} />;

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <Header onOpenContact={openContact} />

      <main id="main">
        <Hero />
        <Work />
        <Aidd />
      </main>
    </>
  );
}
