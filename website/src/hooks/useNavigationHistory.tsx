"use client";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

interface NavigationHistoryEntry {
  path: string;
  timestamp: number;
  referrer?: string;
}
const SESSION_TTL = 5 * 60 * 1000; // 1 min in ms

export function useNavigationHistory() {
  const pathname = usePathname();
  const previousPathRef = useRef<string | null>(null);

  const getHistory = (): NavigationHistoryEntry[] => {
    if (typeof window === "undefined") return [];
    try {
      const stored = sessionStorage.getItem("navigationHistory");
      if (!stored) return [];

      const parsed: NavigationHistoryEntry[] = JSON.parse(stored);
      const now = Date.now();

      // keep only entries within TTL
      return parsed.filter((entry) => now - entry.timestamp < SESSION_TTL);
    } catch {
      return [];
    }
  };

  useEffect(() => {
    // Get current history from sessionStorage

    // Save history to sessionStorage
    const saveHistory = (history: NavigationHistoryEntry[]) => {
      if (typeof window === "undefined") return;
      try {
        sessionStorage.setItem("navigationHistory", JSON.stringify(history));
      } catch (error) {
        console.error("Failed to save navigation history:", error);
      }
    };

    // Add current page to history
    const addToHistory = (path: string) => {
      const history = getHistory();
      const newEntry: NavigationHistoryEntry = {
        path,
        timestamp: Date.now(),
        referrer:
          typeof document !== "undefined"
            ? document.referrer || undefined
            : undefined,
      };

      // Remove duplicate consecutive entries
      const lastEntry = history[history.length - 1];
      if (!lastEntry || lastEntry.path !== path) {
        history.push(newEntry);

        // Keep only last 3 entries to prevent memory issues
        if (history.length > 5) {
          history.shift();
        }

        saveHistory(history);
      }
    };

    // Track the current page
    addToHistory(pathname);

    // Update previous path reference
    return () => {
      previousPathRef.current = pathname;
    };
  }, [pathname]);

  // Get navigation history
  const getNavigationHistory = (): NavigationHistoryEntry[] => {
    if (typeof window === "undefined") return [];
    try {
      const stored = sessionStorage.getItem("navigationHistory");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  };

  // Get previous page
  const getPreviousPage = (): string | null => {
    const history = getHistory();
    if (history.length > 1) {
      const prev = history[history.length - 2];
      const now = Date.now();
      // check expiry before returning
      return now - prev.timestamp < SESSION_TTL ? prev.path : null;
    }
    return null;
  };

  // Get full navigation path as string
  const getNavigationPath = (): string => {
    const history = getNavigationHistory();
    return history.map((entry) => entry.path).join(" → ");
  };

  // Clear history
  const clearHistory = () => {
    if (typeof window !== "undefined") {
      try {
        sessionStorage.removeItem("navigationHistory");
      } catch (error) {
        console.error("Failed to clear navigation history:", error);
      }
    }
  };

  //   useEffect(() => {
  //     return () => {
  //       clearHistory();
  //     };
  //   }, []);
  return {
    getNavigationHistory,
    getPreviousPage,
    getNavigationPath,
    clearHistory,
    currentPath: pathname,
  };
}
