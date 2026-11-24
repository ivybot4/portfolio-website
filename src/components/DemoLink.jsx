import { useEffect, useRef, useState } from "react";
import { hasVideoDemo } from "../data/projects";

function VideoModal({ open, onClose, src, title }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      aria-label={`${title} demo video`}
      onClose={onClose}
      // A click on the dialog itself (not its content) is a click on the backdrop.
      onClick={(event) => event.target === dialogRef.current && onClose()}
      className="m-auto max-h-[92dvh] max-w-[92vw] overflow-hidden border-[2px] border-black bg-white p-0 text-neutral-950 backdrop:bg-black/75"
    >
      {/* Mounted only while open, so closing the modal also stops playback. */}
      {open && (
        <div className="flex flex-col">
          <div className="flex items-center justify-between gap-4 border-b-[2px] border-black px-3 py-2">
            <p className="truncate text-xs uppercase tracking-wide">Demo · {title}</p>
            <button
              type="button"
              onClick={onClose}
              className="shrink-0 border border-black px-2 py-0.5 text-xs uppercase tracking-wide transition hover:bg-black hover:text-white"
            >
              Close ✕
            </button>
          </div>
          <video
            controls
            autoPlay
            playsInline
            preload="metadata"
            className="mx-auto block h-auto max-h-[calc(92dvh-2.75rem)] w-auto max-w-full bg-black"
          >
            {/* H.264 .mov files play as MP4 in every major browser when typed this way. */}
            <source src={src} type="video/mp4" />
            Your browser can’t play this video. <a href={src}>Download it instead.</a>
          </video>
        </div>
      )}
    </dialog>
  );
}

export default function DemoLink({ project, className, children = "Demo" }) {
  const [open, setOpen] = useState(false);
  const { demo, title } = project;

  if (!hasVideoDemo(project)) {
    return (
      <a href={demo} target="_blank" rel="noopener noreferrer" className={className}>
        {children}
      </a>
    );
  }

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} aria-haspopup="dialog" className={className}>
        {children}
      </button>
      <VideoModal open={open} onClose={() => setOpen(false)} src={demo} title={title} />
    </>
  );
}
