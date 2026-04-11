"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface AccordionItem {
  question: string;
  answer: string;
}

export function Accordion({
  items,
  defaultAllOpen = false,
}: {
  items: AccordionItem[];
  defaultAllOpen?: boolean;
}) {
  const [openSet, setOpenSet] = useState<Set<number>>(
    () => new Set(defaultAllOpen ? items.map((_, i) => i) : [])
  );

  const toggle = (i: number) => {
    setOpenSet((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  };

  return (
    <div className="divide-y divide-[var(--divider)]">
      {items.map((item, i) => (
        <div key={i}>
          <button
            onClick={() => toggle(i)}
            className="flex w-full items-center justify-between py-5 text-left text-sm font-semibold transition-colors hover:text-[var(--text-primary)]"
          >
            {item.question}
            <ChevronDown
              size={16}
              className={`shrink-0 text-[var(--text-subtle)] transition-transform duration-200 ${
                openSet.has(i) ? "rotate-180" : ""
              }`}
            />
          </button>
          <div
            className="grid transition-all duration-300"
            style={{
              gridTemplateRows: openSet.has(i) ? "1fr" : "0fr",
            }}
          >
            <div className="overflow-hidden">
              <p className="pb-5 text-sm leading-relaxed text-[var(--text-muted)]">
                {item.answer}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
