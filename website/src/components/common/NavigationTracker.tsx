"use client";
import { useNavigationHistory } from "@/hooks/useNavigationHistory";

export function NavigationTracker() {
  // This component just initializes the navigation tracking
  useNavigationHistory();
  return null;
}
