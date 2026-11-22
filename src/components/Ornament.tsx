/* The eight-point star from the label, used sparingly as a divider. */
export function Star({ className = "", size = 22 }: { className?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="1.1">
        <rect x="5" y="5" width="14" height="14" />
        <rect x="5" y="5" width="14" height="14" transform="rotate(45 12 12)" />
      </g>
    </svg>
  );
}

/* A brass hairline with the star in the middle. */
export function Divider({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-4 text-brass ${className}`} aria-hidden="true">
      <span className="h-px flex-1 bg-brass/50" />
      <Star />
      <span className="h-px flex-1 bg-brass/50" />
    </div>
  );
}
