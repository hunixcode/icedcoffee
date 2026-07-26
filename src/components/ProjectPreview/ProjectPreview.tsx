import type { Project } from "../../data/projects";
import Glyph from "../Glyph/Glyph";
import "./ProjectPreview.css";

interface ProjectPreviewProps {
  project: Project;
}

/**
 * Left-hand visual of the "what do i do" section.
 *
 * When a project ships a real screenshot it is rendered as-is; otherwise we
 * draw a faithful mock of the application window in pure CSS. Everything is
 * sized in container-query units so the mock scales pixel-perfectly at any
 * viewport width.
 */
export default function ProjectPreview({ project }: ProjectPreviewProps) {
  if (project.image) {
    return (
      <div className="preview">
        <img className="preview__shot" src={project.image} alt={`${project.title} screenshot`} />
      </div>
    );
  }

  const { heading, subheading, items } = project.preview;

  return (
    <div className="preview" role="img" aria-label={`${project.title} interface preview`}>
      <div className="preview__chrome" aria-hidden="true" />

      <div className="preview__body">
        <p className="preview__heading">{heading}</p>
        <p className="preview__sub">{subheading}</p>

        <ul className="preview__items">
          {items.map((item) => (
            <li key={item.title} className="preview__item">
              <Glyph name={item.icon} className="preview__icon" />
              <p className="preview__item-title">{item.title}</p>
              <p className="preview__item-desc">{item.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
