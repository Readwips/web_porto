"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

type NavigationMotionContextValue = {
  navbarIntroPlayed: boolean;
  markNavbarIntroPlayed: () => void;
};

const NavigationMotionContext =
  createContext<NavigationMotionContextValue | null>(null);

export function NavigationMotionProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [navbarIntroPlayed, setNavbarIntroPlayed] = useState(false);
  const markNavbarIntroPlayed = useCallback(() => {
    setNavbarIntroPlayed(true);
  }, []);
  const value = useMemo(
    () => ({ navbarIntroPlayed, markNavbarIntroPlayed }),
    [navbarIntroPlayed, markNavbarIntroPlayed],
  );

  return (
    <NavigationMotionContext.Provider value={value}>
      {children}
    </NavigationMotionContext.Provider>
  );
}

export function useNavigationMotion() {
  const context = useContext(NavigationMotionContext);

  if (!context) {
    throw new Error(
      "useNavigationMotion must be used within NavigationMotionProvider",
    );
  }

  return context;
}
