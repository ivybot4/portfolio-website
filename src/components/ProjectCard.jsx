import { Link } from "react-router-dom";
import { hasDetailPage } from "../data/projects";

const BUTTON =
  "whitespace-nowrap border border-black bg-white px-2 py-1 uppercase tracking-wide transition sm:px-3";

// An internal route (`to`), an external link (`href`), or, with neither, a
// greyed-out placeholder that is not clickable.
function CardButton({ to, href, children }) {
  if (to) {
    return (
      <Link to={to} className={`${BUTTON} hover:bg-black hover:text-white`}>
        {children}
      </Link>
    );
  }
  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={`${BUTTON} hover:bg-black hover:text-white`}>
        {children}
      </a>
    );
  }
  return (
    <span aria-disabled="true" title="Coming soon" className={`${BUTTON} cursor-not-allowed opacity-35`}>
      {children}
      <span className="sr-only"> (coming soon)</span>
    </span>
  );
}

export default function ProjectCard({ project }) {
  const linked = hasDetailPage(project);
  const image = (
    <div className="aspect-square overflow-hidden border-[2px] border-black bg-white">
      <img
        src={project.image}
        alt={project.tagline ? `${project.title}: ${project.tagline}` : project.title}
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
      />
    </div>
  );

  return (
    <div className="w-full max-w-[300px]">
      {/* Without a write-up there is no detail page, so the card is not a link. */}
      {linked ? (
        <Link to={`/projects/${project.id}`} className="group block" aria-label={`Read more about ${project.title}`}>
          {image}
        </Link>
      ) : (
        <div className="group">{image}</div>
      )}

      {/* Details, GitHub and Demo always show; one without a link yet is greyed out. */}
      <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-[11px] sm:text-xs">
        <CardButton to={linked ? `/projects/${project.id}` : undefined}>Details</CardButton>
        <CardButton href={project.github}>GitHub</CardButton>
        <CardButton href={project.demo}>Demo</CardButton>
        {project.readmore && <CardButton href={project.readmore}>Read More</CardButton>}
      </div>
    </div>
  );
}