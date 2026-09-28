import type { Theme } from "./WorkspacePreview";

type Props = {
  total: number;
  theme: Theme;
  onRent: () => void;
  onToggleTheme: () => void;
};

export default function Header({ total, theme, onRent, onToggleTheme }: Props) {
  const dark = theme === "dark";
  return (
    <header className="sticky top-3 z-10 mt-4 flex items-center gap-4 rounded-2xl border border-line bg-surface px-4 py-3 max-md:flex-wrap">
      <div className="flex items-center gap-2.5 font-extrabold">
        <span className="rounded-full bg-ink px-3 py-1.5 text-[15px] tracking-tight text-white dark:bg-accent">
          monis.rent
        </span>
        <span className="h-[22px] w-px bg-line" />
        <span className="text-sm font-semibold text-muted">Workspace Builder</span>
      </div>
      <h1 className="m-0 flex-1 text-center text-xl tracking-tight max-md:order-3 max-md:basis-full max-md:text-left">
        Build your rental workspace
      </h1>
      <div className="flex items-center gap-2.5">
        <span
          data-testid="header-total"
          className="rounded-full border border-[#f3c9ae] bg-[#fff4ec] px-3 py-2 text-sm font-extrabold text-[#9a3d16] dark:border-[#6d5aa8] dark:bg-[#2a1f3d] dark:text-[#d9ccff]"
        >
          €{total}/mo
        </span>
        <button
          onClick={onToggleTheme}
          title={dark ? "Switch to light mode" : "Switch to dark RGB mode"}
          aria-label={dark ? "Switch to light mode" : "Switch to dark RGB mode"}
          data-testid="theme-toggle"
          className="cursor-pointer rounded-full border border-line bg-transparent px-3 py-2 text-sm transition active:scale-95"
        >
          {dark ? "☀️" : "🌙"}
        </button>
        <button
          onClick={onRent}
          className="cursor-pointer rounded-full border border-ink bg-ink px-3.5 py-2 text-sm font-semibold text-white transition active:scale-95 dark:border-accent dark:bg-accent"
        >
          Rent Your Setup!
        </button>
      </div>
    </header>
  );
}
