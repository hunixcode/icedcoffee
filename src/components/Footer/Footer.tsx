import { site } from "../../data/site";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer shell t-mono">
      <p>
        © {new Date().getFullYear()} {site.name}
      </p>
      <p className="footer__made">made with react &amp; a lot of coffee</p>
      <a className="link" href="#home">
        back to top ↑
      </a>
    </footer>
  );
}
