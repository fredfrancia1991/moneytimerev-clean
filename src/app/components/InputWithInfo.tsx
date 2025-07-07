'use client';

import { useState, useRef, useEffect, ChangeEvent } from 'react';

function InfoBulle({ text }: { text: string }) {
  const [show, setShow] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!show) return () => {};
    const handleClick = (e: MouseEvent | TouchEvent) => {
      if (!ref.current?.contains(e.target as Node)) {
        setShow(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    document.addEventListener('touchstart', handleClick);
  
    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('touchstart', handleClick);
    };
  }, [show]);
  

  const handleToggle = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    setShow(v => !v);
  };

  return (
    <span ref={ref} className="infoIcon relative inline-block">
      <span
        tabIndex={0}
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        onTouchStart={handleToggle}
        onClick={handleToggle}
        onFocus={() => setShow(true)}
        onBlur={() => setShow(false)}
        aria-label="Afficher l’information"
        role="button"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
          <circle cx="10" cy="10" r="9" fill="#E8F3FA" stroke="#b7c5d9" strokeWidth="1.5" />
          <text x="10" y="14.2" textAnchor="middle" fontWeight="bold" fontSize="12" fill="#187072" fontFamily="Arial">i</text>
        </svg>
      </span>
      {show && (
        <span className="infoBubble absolute z-10 bg-white border border-gray-300 rounded p-3 text-sm shadow-lg mt-2 w-[250px] left-1/2 -translate-x-1/2">
          {text}
        </span>
      )}
    </span>
  );
}

type InputWithInfoProps = {
  label: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  info: string;
  name: string;
};

export default function InputWithInfo({
  label,
  value,
  onChange,
  info,
  name
}: InputWithInfoProps) {
  return (
    <label className="inputBlock block">
      <div className="labelRow flex justify-between items-center font-medium text-sm mb-1">
        <span>{label}</span>
        <InfoBulle text={info} />
      </div>
      <div className="inputWrapper relative">
        <span className="euro absolute left-3 top-1/2 -translate-y-1/2 text-[#187072] font-bold">€</span>
        <input
          type="number"
          value={value}
          name={name}
          onChange={onChange}
          className="input w-full pl-8 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#187072]"
          placeholder="0"
          min="0"
          step="any"
          inputMode="decimal"
        />
      </div>
    </label>
  );
}
