"use client";

import { Moon, Sun } from "lucide-react";
import { useState } from "react";
import { useTheme } from "@/context/theme-context";
import { motion } from "framer-motion";

interface ThemeToggleProps {
  variant?: "icon" | "full";
  className?: string;
}

export function ThemeToggle({ variant = "icon", className = "" }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();
  const [isHovered, setIsHovered] = useState(false);
  
  // Animation variants for smoother transitions
  const iconVariants = {
    hidden: { scale: 0, opacity: 0, rotate: -45 },
    visible: { scale: 1, opacity: 1, rotate: 0 }
  };

  const cycleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const getIcon = () => {
    switch (theme) {
      case "light":
        return <Sun className="h-[1.2rem] w-[1.2rem]" />;
      case "dark":
        return <Moon className="h-[1.2rem] w-[1.2rem]" />;
      default:
        return <Sun className="h-[1.2rem] w-[1.2rem]" />;
    }
  };

  const getLabel = () => {
    switch (theme) {
      case "light":
        return "Light";
      case "dark":
        return "Dark";
      default:
        return "Light";
    }
  };

  return variant === "icon" ? (
    <motion.button
      onClick={cycleTheme}
      className={`rounded-full p-2 hover:bg-muted/80 ${className}`}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      aria-label={`Change theme, current theme is ${getLabel()}`}
    >
      <motion.div
        key={theme}
        initial="hidden"
        animate="visible"
        variants={iconVariants}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {getIcon()}
      </motion.div>
    </motion.button>
  ) : (
    <motion.button
      onClick={cycleTheme}
      className={`flex items-center gap-2 rounded-md px-3 py-2 hover:bg-muted/80 ${className}`}
      whileHover={{ x: 3 }}
      whileTap={{ scale: 0.97 }}
    >
      <motion.div
        key={theme}
        initial="hidden"
        animate="visible"
        variants={iconVariants}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {getIcon()}
      </motion.div>
      <span className="text-sm font-medium">{getLabel()}</span>
    </motion.button>
  );
}
