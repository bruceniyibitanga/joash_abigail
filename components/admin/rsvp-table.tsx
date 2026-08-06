"use client";

import { useMemo, useState } from "react";

import type { RsvpRow } from "@/lib/rsvp/queries";

type Filter = "all" | "accepts" | "declines";

const FILTERS: { value: Filter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "accepts", label: "Attending" },
  { value: "declines", label: "Declined" },
];

const CSV_COLUMNS = [
  "Name",
  "Email",
  "Phone",
  "Response",
  "Party size",
  "Dietary",
  "Hymn",
  "Message",
  "Responded",
] as const;

export function RsvpTable({ rows }: { rows: RsvpRow[] }) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("all");

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();

    return rows.filter((row) => {
      if (filter !== "all" && row.attendance !== filter) return false;
      if (!needle) return true;

      return [row.full_name, row.email, row.phone, row.dietary, row.hymn, row.message]
        .filter(Boolean)
        .some((field) => field!.toLowerCase().includes(needle));
    });
  }, [rows, query, filter]);

  /** Exports what is currently on screen, so a filtered view exports filtered. */
  const downloadCsv = () => {
    const escape = (value: string | number | null) => {
      const text = value === null ? "" : String(value);
      // Always quote: names and messages routinely contain commas and quotes.
      return `"${text.replace(/"/g, '""')}"`;
    };

    const lines = [
      CSV_COLUMNS.join(","),
      ...visible.map((row) =>
        [
          row.full_name,
          row.email,
          row.phone,
          row.attendance === "accepts" ? "Attending" : "Declined",
          row.guest_count,
          row.dietary,
          row.hymn,
          row.message,
          new Date(row.created_at).toISOString(),
        ]
          .map(escape)
          .join(","),
      ),
    ];

    // BOM so Excel opens UTF-8 names correctly.
    const blob = new Blob(["﻿" + lines.join("\r\n")], {
      type: "text/csv;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `rsvps-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section className="mt-12">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          {FILTERS.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => setFilter(option.value)}
              aria-pressed={filter === option.value}
              className={`micro cursor-pointer rounded-full border px-4 py-2.5 transition-colors duration-200 ${
                filter === option.value
                  ? "border-ember-600 bg-ember-600 text-cream"
                  : "border-ember-200 text-ember-700 hover:border-ember-400"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <label htmlFor="rsvp-search" className="sr-only">
            Search guests
          </label>
          <input
            id="rsvp-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search name, email, notes…"
            className="w-full rounded-full border border-ember-200 bg-white/70 px-5 py-2.5 text-sm outline-none transition-colors duration-200 focus:border-ember-400 sm:w-72"
          />
          <button
            type="button"
            onClick={downloadCsv}
            disabled={visible.length === 0}
            className="micro cursor-pointer rounded-full border border-ink bg-ink px-5 py-2.5 whitespace-nowrap text-cream transition-colors duration-200 hover:bg-transparent hover:text-ink disabled:cursor-not-allowed disabled:opacity-40"
          >
            Export CSV
          </button>
        </div>
      </div>

      <p className="text-ink-soft mt-5 text-sm">
        Showing {visible.length} of {rows.length}
      </p>

      {visible.length === 0 ? (
        <p className="text-ink-soft mt-10 rounded-2xl border border-dashed border-ember-200 p-10 text-center text-[0.9375rem]">
          {rows.length === 0
            ? "No responses yet. They will appear here as guests reply."
            : "No guests match that search."}
        </p>
      ) : (
        // Wide table scrolls inside its own container rather than the page.
        <div className="mt-5 overflow-x-auto rounded-2xl border border-ember-200/60">
          <table className="w-full min-w-[62rem] border-collapse text-left text-sm">
            <thead>
              <tr className="bg-ember-50">
                {CSV_COLUMNS.map((column) => (
                  <th
                    key={column}
                    scope="col"
                    className="micro px-4 py-4 whitespace-nowrap text-ember-700"
                  >
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {visible.map((row) => (
                <tr key={row.id} className="border-t border-ember-200/60 align-top">
                  <td className="px-4 py-4 font-medium">{row.full_name}</td>
                  <td className="px-4 py-4">
                    <a
                      href={`mailto:${row.email}`}
                      className="text-ember-700 underline-offset-2 hover:underline"
                    >
                      {row.email}
                    </a>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">{row.phone ?? "—"}</td>
                  <td className="px-4 py-4">
                    <span
                      className={`micro inline-block rounded-full px-3 py-1.5 whitespace-nowrap ${
                        row.attendance === "accepts"
                          ? "bg-ember-600 text-cream"
                          : "bg-ember-100 text-ember-700"
                      }`}
                    >
                      {row.attendance === "accepts" ? "Attending" : "Declined"}
                    </span>
                  </td>
                  <td className="px-4 py-4 tabular-nums">{row.guest_count}</td>
                  <td className="text-ink-soft max-w-56 px-4 py-4">
                    {row.dietary ?? "—"}
                  </td>
                  <td className="text-ink-soft max-w-56 px-4 py-4">
                    {row.hymn ?? "—"}
                  </td>
                  <td className="text-ink-soft max-w-80 px-4 py-4">
                    {row.message ?? "—"}
                  </td>
                  <td className="text-ink-soft px-4 py-4 whitespace-nowrap">
                    {new Date(row.created_at).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
