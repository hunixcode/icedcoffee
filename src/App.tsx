import { useCallback, useEffect, useState } from "react";
import Header from "./components/Header/Header";
import Hero from "./sections/Hero/Hero";
import Work from "./sections/Work/Work";
import Aidd from "./sections/Aidd/Aidd";
import Downloads from "./sections/Downloads/Downloads";
import ContactPage from "./pages/ContactPage/ContactPage";
import PageLoader from "./components/PageLoader/PageLoader";
import ScrollProgress from "./components/ScrollProgress/ScrollProgress";
import Footer from "./components/Footer/Footer";
import Sky from "./components/Sky/Sky";
import Marquee from "./components/Marquee/Marquee";
import { site } from "./data/site";
import { IntroContext } from "./lib/intro";

export default function App() {
  const [showContact, setShowContact] = useState(() => location.hash === "#contact");
  const [introDone, setIntroDone] = useState(false);
  const markIntroDone = useCallback(() => setIntroDone(true), []);

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
    <IntroContext value={introDone}>
      <PageLoader modulesReady onReveal={markIntroDone} />

      <Sky />
      <div className="grain" aria-hidden="true" />


      {showContact ? (
        <ContactPage onClose={closeContact} />
      ) : (
        <>
          <a className="skip-link" href="#main">
            Skip to content
          </a>

          <ScrollProgress />
          <Header onOpenContact={openContact} />

          <main id="main">
            <Hero />
            <Marquee items={site.marquee} angle={0} />
            <Work />
            <Downloads />
            <Aidd />
          </main>

          <Footer onOpenContact={openContact} />
        </>
      )}
    </IntroContext>
  );
}
