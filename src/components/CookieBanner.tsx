"use client";
import { useState, useEffect } from "react";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem("cookie_ok");
    if (!accepted) setVisible(true);
  }, []);

  const accept = () => {
    localStorage.setItem("cookie_ok", "1");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 bg-[#26436E] text-white text-sm p-4 flex justify-between items-center z-50">
      <span>Nous utilisons des cookies à des fins statistiques uniquement. En continuant, vous acceptez leur utilisation.</span>
      <button onClick={accept} className="ml-4 px-3 py-1 bg-white text-[#26436E] rounded">OK</button>
    </div>
  );
}
