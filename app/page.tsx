"use client";

import { useEffect, useState } from "react";
import AppShellProvider from "./services/provides";
import HelpClient from "./help/v1/HelpClient";

export default function Home(){
  const [isHelp, setIsHelp] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (window.location.hash === '#help') {
      setIsHelp(true);
    }
    
    const onHashChange = () => {
      if (window.location.hash === '#help') {
        setIsHelp(true);
      } else {
        setIsHelp(false);
      }
    };
    
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  if (!mounted) {
    return null; // Avoid hydration mismatch
  }

  if (isHelp) {
    return <HelpClient />;
  }

  return <AppShellProvider />;
}
