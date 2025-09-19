"use client";

import { useEffect, useState } from "react";
import Lucide from "../ui/Lucide";

type ToastProps = {
  message: string;
  type: "success" | "error";
  duration?: number;
};

export default function Toast({ message, type, duration = 3000 }: ToastProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), duration);
    return () => clearTimeout(timer);
  }, [duration]);

  if (!visible) return null;

  return (
    <div
      className={`fixed bottom-5 right-5 z-50 transform transition-all duration-300 ease-out
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
        px-5 py-3 shadow-lg font-semibold text-black border border-gray-200
        flex gap-4 items-center
      `}
    >
      {type === "success" ? (
        <Lucide icon="MailCheck" className="text-green-500" />
      ) : (
        <Lucide icon="MailX" className="text-red-500" />
      )}{" "}
      {message}
    </div>
  );
}
