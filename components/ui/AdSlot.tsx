interface AdSlotProps {
  slot?: string;
  className?: string;
  height?: number;
  label?: string;
}

export function AdSlot({ slot = "default", className = "", height = 90, label = "Advertisement" }: AdSlotProps) {
  return (
    <div
      className={`ad-slot ${className}`}
      style={{ height: `${height}px` }}
      data-ad-slot={slot}
    >
      <span>{label} · Google AdSense</span>
    </div>
  );
}
