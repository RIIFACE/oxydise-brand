/**
 * Re-mounts on every navigation (unlike layout.jsx, which persists).
 * The animate-page-enter class fires a fade + slide-up on each page visit.
 */
export default function Template({ children }) {
  return <div className="animate-page-enter">{children}</div>;
}
