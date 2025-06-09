"use client";

import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react"; // Importing icon library

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false); // To control the popup visibility

  // Avoid hydration mismatch
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div className="relative">
      {/* Button to open the popup */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white"
      >
        {/* Display the moon or sun icon depending on the current theme */}
        {theme === "dark" ? <Moon size={24} /> : <Sun size={24} />}
      </button>

      {/* Popup Card with theme selection */}
      {isOpen && (
        <div className="absolute top-10 right-0 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg space-y-2">
          <button
            onClick={() => setTheme("light")}
            className={`w-full text-left p-2 rounded-lg ${
              theme === "light" ? "bg-gray-300" : ""
            }`}
          >
            Light Theme
          </button>
          <button
            onClick={() => setTheme("dark")}
            className={`w-full text-left p-2 rounded-lg ${
              theme === "dark" ? "bg-gray-300" : ""
            }`}
          >
            Dark Theme
          </button>
          <button
            onClick={() => setTheme("system")}
            className={`w-full text-left p-2 rounded-lg ${
              theme === "system" ? "bg-gray-300" : ""
            }`}
          >
            System Default
          </button>
        </div>
      )}
    </div>
  );
}
