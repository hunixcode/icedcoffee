import { type FormEvent, useState } from "react";
import { motion } from "motion/react";
import Header from "../../components/Header/Header";
import { site, socials } from "../../data/site";
import { lift, smooth, spring } from "../../lib/motion";
import "./ContactPage.css";

interface ContactPageProps {
  onClose: () => void;
}

export default function ContactPage({ onClose }: ContactPageProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const mailto = `mailto:${site.contactEmail}?subject=${encodeURIComponent(subject || "Contact from website")}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)}`;
    window.location.href = mailto;
  };

  return (
    <>
      <Header />
      <div className="contact-page">
        <div className="contact-page__inner shell">
          <motion.div
            className="contact-page__head"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={smooth(0.6, 0.05)}
          >
            <h1 className="contact-page__title t-condensed">get in touch</h1>
            <p className="contact-page__sub t-mono">
              have a question, a project, or just want to say hi?
            </p>
          </motion.div>

          <div className="contact-page__grid">
            <motion.form
              className="contact-page__form"
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 34 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...spring.gentle, delay: 0.18 }}
            >
              <div className="contact-page__field">
                <label className="contact-page__label t-mono" htmlFor="cp-name">
                  name
                </label>
                <input
                  id="cp-name"
                  className="contact-page__input"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="contact-page__field">
                <label className="contact-page__label t-mono" htmlFor="cp-email">
                  email
                </label>
                <input
                  id="cp-email"
                  className="contact-page__input"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="contact-page__field">
                <label className="contact-page__label t-mono" htmlFor="cp-subject">
                  subject
                </label>
                <input
                  id="cp-subject"
                  className="contact-page__input"
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                />
              </div>

              <div className="contact-page__field">
                <label className="contact-page__label t-mono" htmlFor="cp-message">
                  message
                </label>
                <textarea
                  id="cp-message"
                  className="contact-page__textarea"
                  rows={5}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>

              <motion.button
                type="submit"
                className="btn-solid contact-page__submit"
                {...lift}
              >
                send message
              </motion.button>
            </motion.form>

            <motion.div
              className="contact-page__sidebar"
              initial={{ opacity: 0, y: 34 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...spring.gentle, delay: 0.3 }}
            >
              <div className="contact-page__info">
                <h2 className="contact-page__info-title t-mono">contact info</h2>

                <div className="contact-page__info-item">
                  <span className="contact-page__info-label t-mono">email</span>
                  <a
                    className="contact-page__info-value"
                    href={`mailto:${site.contactEmail}`}
                  >
                    {site.contactEmail}
                  </a>
                </div>

                <div className="contact-page__info-item">
                  <span className="contact-page__info-label t-mono">phone</span>
                  <a className="contact-page__info-value" href={`tel:${site.phone}`}>
                    {site.phone}
                  </a>
                </div>
              </div>

              <div className="contact-page__socials">
                <h2 className="contact-page__info-title t-mono">socials</h2>
                <ul className="contact-page__socials-list">
                  {socials.map((s) => (
                    <li key={s.label}>
                      <a
                        className="contact-page__socials-link t-mono"
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {s.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>

          <motion.div
            className="contact-page__foot"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { ...smooth(0.5), delay: 0.42 } }}
          >
            <motion.button
              className="contact-page__back t-mono"
              onClick={onClose}
              whileHover={{ x: -4 }}
              whileTap={{ scale: 0.96 }}
            >
              &larr; back home
            </motion.button>
          </motion.div>
        </div>
      </div>
    </>
  );
}
