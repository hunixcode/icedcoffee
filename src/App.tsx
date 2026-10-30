import { useCallback, useEffect, useState } from "react";
import Header from "./components/Header/Header";
import Background3D from "./components/Background3D/Background3D";
import Hero from "./sections/Hero/Hero";
import Work from "./sections/Work/Work";
import Aidd from "./sections/Aidd/Aidd";
import Downloads from "./sections/Downloads/Downloads";
import ContactPage from "./pages/ContactPage/ContactPage";

export default function App() {
  const [showContact, setShowContact] = useState(() => location.hash === "#contact");

  // Swapping pages keeps the old scroll offset: start the contact page at the top, and
  // land on the hash's section when coming back (menu link, back button, deep link).
  useEffect(() => {
    if (showContact) window.scrollTo({ top: 0, behavior: "instant" });
    else document.getElementById(location.hash.slice(1))?.scrollIntoView({ behavior: "instant" });
  }, [showContact]);

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

  return (
    <>
      {/* Mounted once above the page swap so the WebGL scene survives navigation. */}
      <Background3D />

      {showContact ? (
        <ContactPage onClose={closeContact} />
      ) : (
        <>
          <a className="skip-link" href="#main">
            Skip to content
          </a>

          <Header onOpenContact={openContact} />

          <main id="main">
            <Hero />
            <Work />
            <Aidd />
            <Downloads />
          </main>
        </>
      )}
    </>
  );
}
