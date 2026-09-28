"use client";

import { useEffect, useMemo, useState } from "react";
import type { WorkspaceState } from "@/lib/data";
import { monthlyTotal } from "@/lib/data";
import Header from "@/components/Header";
import ProductPanel from "@/components/ProductPanel";
import WorkspacePreview, { type Theme } from "@/components/WorkspacePreview";
import AccessoryActions from "@/components/AccessoryActions";
import RentSummary from "@/components/RentSummary";
import BottomCategories from "@/components/BottomCategories";

const DEFAULT_STATE: WorkspaceState = {
  desk: "desk-oak",
  chair: "chair-ergo",
  accessories: ["monitor"],
  extras: [],
};

export default function WorkspaceBuilderPage() {
  const [state, setState] = useState<WorkspaceState>(DEFAULT_STATE);
  const [rentOpen, setRentOpen] = useState(false);
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem("monis-theme");
      if (saved === "light" || saved === "dark") setTheme(saved);
    } catch {
      /* private mode — keep default dark */
    }
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    try {
      window.localStorage.setItem("monis-theme", theme);
    } catch {
      /* ignore */
    }
  }, [theme]);

  const total = useMemo(() => monthlyTotal(state), [state]);

  const toggleAccessory = (id: string) =>
    setState((s) => ({
      ...s,
      accessories: s.accessories.includes(id)
        ? s.accessories.filter((a) => a !== id)
        : [...s.accessories, id],
    }));

  const toggleExtra = (id: string) =>
    setState((s) => ({
      ...s,
      extras: s.extras.includes(id)
        ? s.extras.filter((e) => e !== id)
        : [...s.extras, id],
    }));

  return (
    <div className="mx-auto max-w-[1280px] px-5 pb-10">
      <Header
        total={total}
        theme={theme}
        onRent={() => setRentOpen(true)}
        onToggleTheme={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
      />

      <main className="mt-[18px] grid grid-cols-[280px_1fr_260px] items-start gap-[18px] max-lg:grid-cols-2 max-sm:grid-cols-1">
        <ProductPanel
          state={state}
          onSelectDesk={(id) => setState((s) => ({ ...s, desk: id }))}
          onSelectChair={(id) => setState((s) => ({ ...s, chair: id }))}
        />

        <div className="max-lg:order-first max-lg:col-span-full">
          <WorkspacePreview state={state} theme={theme} />
        </div>

        <AccessoryActions
          state={state}
          onToggleAccessory={toggleAccessory}
          onRent={() => setRentOpen(true)}
          onClear={() => setState((s) => ({ ...s, accessories: [] }))}
        />
      </main>

      <BottomCategories extras={state.extras} onToggleExtra={toggleExtra} />

      <footer className="mt-4 flex flex-wrap justify-between gap-2.5 text-[13px] text-muted">
        <span>monis.rent · flexible furniture rental</span>
        <span>Monthly prices incl. delivery &amp; pickup · No deposit</span>
      </footer>

      <RentSummary
        open={rentOpen}
        state={state}
        onClose={() => setRentOpen(false)}
        onReset={() => setState(DEFAULT_STATE)}
      />
    </div>
  );
}
