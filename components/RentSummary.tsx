"use client";

import { useState } from "react";
import type { WorkspaceState } from "@/lib/data";
import { getProduct, monthlyTotal } from "@/lib/data";

type Props = {
  open: boolean;
  state: WorkspaceState;
  onClose: () => void;
  onReset: () => void;
};

export default function RentSummary({ open, state, onClose, onReset }: Props) {
  const [confirmed, setConfirmed] = useState(false);

  if (!open) return null;

  const items = [state.desk, state.chair, ...state.accessories, ...state.extras];
  const total = monthlyTotal(state);

  const close = () => {
    setConfirmed(false);
    onClose();
  };

  return (
    <div
      data-testid="rent-modal"
      onClick={close}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(20,15,10,0.5)] p-5"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Rental summary"
        className="w-full max-w-[520px] rounded-[18px] bg-surface p-6 shadow-[0_24px_60px_rgba(0,0,0,0.25)]"
      >
        {!confirmed ? (
          <>
            <h2 className="m-0 text-xl font-bold">Your rental setup</h2>
            <p className="mt-1 text-sm text-muted">
              Review what you&apos;re renting. No payment required today.
            </p>
            <ul className="my-4 flex list-none flex-col gap-2.5 p-0">
              {items.map((id) => {
                const p = getProduct(id);
                if (!p) return null;
                return (
                  <li
                    key={id}
                    className="flex justify-between gap-3 rounded-xl border border-line px-3 py-2.5 text-sm"
                  >
                    <span>
                      <strong>{p.name}</strong>
                      <small className="block text-muted">{p.desc}</small>
                    </span>
                    <span>€{p.price}/mo</span>
                  </li>
                );
              })}
            </ul>
            <div className="mb-3.5 flex items-center justify-between rounded-xl border border-dashed border-line bg-cream p-3 text-sm">
              <span>{items.length} items · rental summary</span>
              <strong data-testid="summary-total">€{total}/mo</strong>
            </div>
            <div className="flex justify-end gap-2.5">
              <button
                onClick={close}
                className="cursor-pointer rounded-full border border-line bg-transparent px-3.5 py-2 text-sm font-semibold transition active:scale-95"
              >
                Keep editing
              </button>
              <button
                data-testid="confirm-rent"
                onClick={() => setConfirmed(true)}
                className="cursor-pointer rounded-full border border-accent bg-accent px-3.5 py-2 text-sm font-semibold text-white transition hover:bg-accent-dark active:scale-95"
              >
                Confirm rental
              </button>
            </div>
          </>
        ) : (
          <div data-testid="rent-confirmed" className="text-center">
            <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-[#e8f7ec] text-[28px] font-extrabold text-[#1f7a34]">
              ✓
            </div>
            <h2 className="m-0 text-xl font-bold">You&apos;re all set!</h2>
            <p className="mt-2 text-sm">
              {items.length} items reserved for <strong>€{total}/mo</strong>. We&apos;ll
              email your delivery slot.
            </p>
            <div className="mt-4 flex justify-center gap-2.5">
              <button
                onClick={() => {
                  setConfirmed(false);
                  onReset();
                  onClose();
                }}
                className="cursor-pointer rounded-full border border-ink bg-ink px-3.5 py-2 text-sm font-semibold text-white transition active:scale-95 dark:border-accent dark:bg-accent"
              >
                Build another setup
              </button>
              <button
                onClick={close}
                className="cursor-pointer rounded-full border border-line bg-transparent px-3.5 py-2 text-sm font-semibold transition active:scale-95"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
