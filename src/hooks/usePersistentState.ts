"use client";

import { useEffect, useRef, useState } from "react";

export function usePersistentState<T>(key: string, initialValue: T) {
  const [state, setState] = useState<T>(initialValue);
  const [isLoaded, setIsLoaded] = useState(false);
  const hasHydratedRef = useRef(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(key);
      if (raw !== null) {
        setState(JSON.parse(raw));
      }
    } catch (error) {
      console.error("Persistent state load error:", error);
    } finally {
      hasHydratedRef.current = true;
      setIsLoaded(true);
    }
  }, [key]);

  useEffect(() => {
    if (!hasHydratedRef.current) return;

    try {
      window.localStorage.setItem(key, JSON.stringify(state));
    } catch (error) {
      console.error("Persistent state save error:", error);
    }
  }, [key, state]);

  const resetState = () => {
    setState(initialValue);
    try {
      window.localStorage.removeItem(key);
    } catch (error) {
      console.error("Persistent state reset error:", error);
    }
  };

  return { state, setState, resetState, isLoaded };
}
