interface Props {
  value: number; // 0-100
  color?: string;
  label?: string;
  size?: "sm" | "md" | "lg";
}

export function ProgressBar({ value, color = "var(--color-accent)", label, size = "md" }: Props) {
  const h = size === "sm" ? "h-1" : size === "lg" ? "h-3" : "h-2";
  return (
    <div>
      {label && (
        <div className="mb-1 flex items-baseline justify-between font-mono text-[11px] uppercase tracking-wide text-muted-foreground">
          <span>{label}</span>
          <span>{value}%</span>
        </div>
      )}
      <div className={`${h} w-full overflow-hidden rounded-full bg-muted`}>
        <div
          className={`${h} rounded-full transition-all`}
          style={{ width: `${value}%`, backgroundColor: color }}
        />
      </div>
    </div>
  );
}
