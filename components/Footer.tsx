export default function Footer() {
  return (
    <footer className="px-6 md:px-12 max-w-[1600px] mx-auto py-8 flex flex-col sm:flex-row justify-between items-center text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-muted border-t border-border mt-8">
      <p>© {new Date().getFullYear()} Garv Mittal — All Rights Reserved</p>
      <p className="mt-4 sm:mt-0 text-foreground hidden sm:block">Available for selected projects — 2026</p>
      <p className="mt-4 sm:mt-0 opacity-50">Local Time: IND</p>
    </footer>
  );
}
