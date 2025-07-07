"use client";
import { ChangeEvent, useState, useEffect, useRef } from "react";

export default function InputWithInfo({
  label,
  value,
  onChange,
  info,
  name,
}: {
  label: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  info: string;
  name: string;
}) {
  return (
    <label className="block mb-6">
      <div className="flex items-center justify-between text-[#363945] font-semibold mb-2">
        <span>{label}</span>
        <InfoBulle text={info} />
      </div>
      <div className="relative">
        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#187072] font-bold">€</span>
        <input
          type="number"
          value={value}
          name={name}
          onChange={onChange}
          placeholder="0"
          min="0"
          step="any"
          inputMode="decimal"
          className="pl-8 pr-4 py-2 w-full border border-[#e2e8f0] rounded-md shadow-sm text-[#363945] focus:outline-none focus:ring-2 focus:ring-[#187072]"
        />
      </div>
    </label>
  );
}

function InfoBulle({ text }: { text: string }) {
  const [show, setShow] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!show) return;
    const handleClick = (e: MouseEvent | TouchEvent) => {
      if (!ref.current?.contains(e.target as Node)) setShow(false);
    };
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("touchstart", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("touchstart", handleClick);
    };
  }, [show]);

  const handleToggle = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    setShow((v) => !v);
  };

  return (
    <span ref={ref} className="relative cursor-pointer">
      <span
        tabIndex={0}
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        onTouchStart={handleToggle}
        onClick={handleToggle}
        onFocus={() => setShow(true)}
        onBlur={() => setShow(false)}
        role="button"
        aria-label="Afficher l’information"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
          <circle cx="10" cy="10" r="9" fill="#E8F3FA" stroke="#b7c5d9" strokeWidth="1.5" />
          <text x="10" y="14.2" textAnchor="middle" fontWeight="bold" fontSize="12" fill="#187072" fontFamily="Arial">i</text>
        </svg>
      </span>
      {show && (
        <span className="absolute z-10 top-full mt-2 left-1/2 transform -translate-x-1/2 w-56 text-sm text-[#363945] bg-white border border-[#e2e8f0] rounded-md shadow-lg p-3">
          {text}
        </span>
      )}
    </span>
  );
}
