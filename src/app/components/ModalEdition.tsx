"use client";
import { ReactNode } from "react";

interface Props {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}

export default function ModalEdition({ open, onClose, children }: Props) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white p-4 rounded shadow w-full max-w-sm">
        {children}
        <button
          onClick={onClose}
          className="mt-4 w-full bg-[#187072] text-white py-2 rounded"
        >
          Fermer
        </button>
      </div>
    </div>
  );
}
