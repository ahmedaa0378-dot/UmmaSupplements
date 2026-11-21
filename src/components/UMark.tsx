/* The U from the UMMA wordmark, redrawn as a small icon. Replace with the vector from the logo file when available. */
export function UMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 84 128" className={className} aria-hidden="true" fill="currentColor">
      <path d="M0 0h22v58l18 18h20V0h24v98H30L0 128z" />
    </svg>
  );
}
