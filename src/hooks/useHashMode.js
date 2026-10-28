import { useState, useEffect } from "react";

const VALID_MODES = ["dev", "design", "marketing"];

/**
 * Reads window.location.hash and returns the active portfolio mode.
 * Falls back to "dev" for any unknown or empty hash.
 *
 * Usage:
 *   const mode = useHashMode(); // "dev" | "design" | "marketing"
 */
export function useHashMode() {
  const getMode = () => {
    const raw = window.location.hash.replace("#", "").toLowerCase().trim();
    return VALID_MODES.includes(raw) ? raw : "dev";
  };

  const [mode, setMode] = useState(getMode);

  useEffect(() => {
    const handleHashChange = () => setMode(getMode());
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  return mode;
}
