export default function Section({ id, title, children }) {
  return (
    <section id={id} className="mx-auto w-full max-w-[1100px] scroll-mt-12 border-t border-black/40 px-4 py-10 sm:px-6 sm:py-12">
      <h2 className="mb-6 text-center sm:mb-8 text-3xl font-bold uppercase tracking-[0.22em] text-neutral-900 sm:text-4xl">
        {title}
      </h2>

      {children}
    </section>
  );
}