type StatTileProps = {
  label: string;
  value: number | string;
  hint?: string;
};

export function StatTile({ label, value, hint }: StatTileProps) {
  return (
    <div className="rounded-2xl border border-ember-200/60 bg-white/60 p-6">
      <p className="micro text-ember-600">{label}</p>
      <p className="font-display mt-3 text-[2.6rem] leading-none font-light tabular-nums">
        {value}
      </p>
      {hint ? <p className="text-ink-soft mt-2 text-[0.8125rem]">{hint}</p> : null}
    </div>
  );
}
