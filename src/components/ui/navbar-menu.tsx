"use client";
import React from "react";
import { motion } from "framer-motion";

const transition = {
  type: "spring" as const,
  mass: 0.5,
  damping: 11.5,
  stiffness: 100,
  restDelta: 0.001,
  restSpeed: 0.001,
};

export const MenuItem = ({
  setActive,
  active,
  item,
  children,
}: {
  setActive: (item: string) => void;
  active: string | null;
  item: string;
  children?: React.ReactNode;
}) => {
  return (
    <div 
      onMouseEnter={() => setActive(item)} 
      onMouseLeave={() => setActive(null)}
      className="relative"
    >
      <motion.p
        transition={{ duration: 0.3 }}
        className="cursor-pointer text-muted-foreground hover:text-primary transition-colors duration-300 px-3 py-2 rounded-lg hover:bg-muted/50"
      >
        {item}
      </motion.p>
      {active === item && (
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.85, y: 10 }}
          transition={transition}
          className="absolute top-[calc(100%_+_0.5rem)] left-1/2 transform -translate-x-1/2 pt-2 z-[100]"
        >
          <motion.div
            transition={transition}
            layoutId="active"
            className="bg-background/95 backdrop-blur-sm rounded-2xl overflow-hidden border border-border/20 shadow-xl min-w-[200px]"
          >
            <motion.div
              layout
              className="w-full h-full p-4"
            >
              {children}
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export const Menu = ({
  setActive,
  children,
}: {
  setActive: (item: string | null) => void;
  children: React.ReactNode;
}) => {
  return (
    <nav
      onMouseLeave={() => setActive(null)}
      className="relative rounded-full border border-border/20 bg-background/95 backdrop-blur-sm flex justify-center space-x-4 px-6 py-3"
    >
      {children}
    </nav>
  );
};

export const HoveredLink = ({ 
  children, 
  onClick, 
  ...rest 
}: {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent) => void;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <button
      {...rest}
      onClick={handleClick}
      className="text-muted-foreground hover:text-primary transition-colors duration-300 text-left w-full py-2 px-3 rounded-lg hover:bg-muted/30"
    >
      {children}
    </button>
  );
};