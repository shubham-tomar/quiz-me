"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from "framer-motion";
import { Brain, Layout, BookOpen, Plus, Menu, X, LogOut, User } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";

interface NavItemProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  isCollapsed: boolean;
}

const NavItem = ({ href, icon, label, isActive, isCollapsed }: NavItemProps) => (
  <Link href={href} className="block">
    <motion.div
      className={`flex items-center gap-3 px-3 py-3 rounded-lg ${isActive ? "bg-primary/10 text-primary font-medium" : "hover:bg-muted"}`}
      whileHover={{ x: 4 }}
      whileTap={{ scale: 0.98 }}
      layout
    >
      <motion.div
        className={`flex items-center justify-center min-w-[24px] ${isActive ? "text-primary" : "text-muted-foreground"}`}
        whileHover={{ scale: 1.1 }}
        transition={{ type: "spring" as const, stiffness: 400 }}
        layout
      >
        {icon}
      </motion.div>

      <AnimatePresence mode="wait">
        {!isCollapsed && (
          <motion.span
            key="nav-text"
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: "auto" }}
            exit={{ opacity: 0, width: 0 }}
            transition={{
              type: "spring" as const,
              stiffness: 300,
              damping: 25,
              duration: 0.2
            }}
            className={`${isActive ? "text-primary" : ""} whitespace-nowrap overflow-hidden flex-1`}
          >
            {label}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.div>
  </Link>
);

export function Sidebar() {
  const { user, signOut } = useAuth();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Set explicit sidebar widths for stable animations
  const expandedWidth = 256;
  const collapsedWidth = 72;

  // Blob animation values with improved stability
  const width = useMotionValue(isOpen ? expandedWidth : collapsedWidth);
  const springWidth = useSpring(width, { damping: 25, stiffness: 400, mass: 0.5 });

  // Create blob path transform with smoother transition
  const blobPath = useTransform(springWidth, (latest) => {
    const isExpanded = latest > (expandedWidth + collapsedWidth) / 2;
    const bulgeAmount = isExpanded ? 15 : 5;
    const baseWidth = latest;

    // More stable path calculation
    return `
      M0,0 
      L${baseWidth - bulgeAmount},0 
      C${baseWidth + bulgeAmount},${100} ${baseWidth + bulgeAmount},${300} ${baseWidth - bulgeAmount},${400}
      L0,400 
      Z
    `;
  });

  useEffect(() => {
    const checkScreenSize = () => {
      const isMobileView = window.innerWidth < 1024;
      setIsMobile(isMobileView);
      setIsOpen(window.innerWidth >= 1024);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Update width value when sidebar state changes with proper values
  useEffect(() => {
    width.set(isOpen ? expandedWidth : collapsedWidth);
  }, [isOpen, width, expandedWidth, collapsedWidth]);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const sidebarVariants = {
    open: {
      width: expandedWidth,
      transition: {
        type: "spring" as const,
        stiffness: 300,
        damping: 24,
      }
    },
    collapsed: {
      width: collapsedWidth,
      transition: {
        type: "spring" as const,
        stiffness: 300,
        damping: 24,
      }
    }
  };

  const mobileMenuVariants = {
    open: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 300,
        damping: 24
      }
    },
    closed: {
      x: "-100%",
      opacity: 0,
      transition: {
        type: "spring" as const,
        stiffness: 300,
        damping: 24
      }
    }
  };

  const navItems = [
    { href: "/dashboard", icon: <Layout size={20} />, label: "Dashboard" },
    { href: "/quizzes", icon: <BookOpen size={20} />, label: "My Quizzes" },
    { href: "/quizzes/create", icon: <Plus size={20} />, label: "Create Quiz" },
  ];

  return (
    <>
      {/* Mobile Toggle Button */}
      <motion.button
        onClick={toggleSidebar}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-full bg-primary text-white shadow-lg"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 500 }}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={isOpen ? "close" : "open"}
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </motion.div>
        </AnimatePresence>
      </motion.button>

      {/* Mobile Menu Overlay */}
      {isOpen && isMobile && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black z-30"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* SVG Blob Shape for Desktop */}
      {!isMobile && (
        <div className="absolute top-0 left-0 h-screen overflow-hidden pointer-events-none z-30">
          <motion.svg
            width={expandedWidth + 30}
            height="100%"
            viewBox={`0 0 ${expandedWidth + 30} 800`}
            fill="none"
            preserveAspectRatio="none"
            style={{ filter: 'drop-shadow(1px 0px 2px rgba(0,0,0,0.05))' }}
          >
            <motion.path
              d={blobPath}
              fill="var(--background)"
              strokeWidth="1"
              stroke="var(--border)"
              initial={false}
            />
          </motion.svg>
        </div>
      )}

      {/* Sidebar */}
      <AnimatePresence initial={false}>
        <motion.aside
          className={`${isMobile ? (isOpen ? 'fixed' : 'hidden') : 'relative'} h-screen z-40 flex flex-col ${isMobile ? 'bg-background border-r shadow-sm' : 'bg-transparent'}`}
          variants={isMobile ? mobileMenuVariants : sidebarVariants}
          initial={false}
          animate={isOpen ? "open" : "collapsed"}
          exit={isMobile ? "closed" : "collapsed"}
          style={!isMobile ? { width: springWidth } : undefined}
          key="sidebar"
        >
          {/* Header */}
          <div className="flex items-center p-4 justify-between">
            <div className="flex items-center gap-2 font-bold text-xl">
              <Brain className="h-6 w-6 text-primary" />
              {isOpen && !isMobile && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  Quiz Me
                </motion.span>
              )}
              {isMobile && <span>Quiz Me</span>}
            </div>
            {!isMobile && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleSidebar}
                className="p-1.5 rounded-lg bg-muted/80 hover:bg-muted"
              >
                <Menu size={18} />
              </motion.button>
            )}
          </div>

          {/* Nav Menu */}
          <motion.nav
            className="flex-1 p-3 space-y-1 overflow-y-auto"
            initial="closed"
            animate="open"
            variants={{
              open: {
                transition: {
                  staggerChildren: 0.08,
                }
              },
              closed: {
                transition: {
                  staggerChildren: 0.05,
                  staggerDirection: -1
                }
              }
            }}
          >
            {navItems.map((item, index) => (
              <motion.div
                key={item.href}
                variants={{
                  open: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      type: "spring",
                      stiffness: 300,
                      damping: 24,
                    }
                  },
                  closed: {
                    opacity: 0,
                    y: 20,
                    transition: {
                      duration: 0.2,
                    }
                  }
                }}
                custom={index}
              >
                <NavItem
                  href={item.href}
                  icon={item.icon}
                  label={item.label}
                  isActive={pathname?.startsWith(item.href) || false}
                  isCollapsed={!isOpen}
                />
              </motion.div>
            ))}
          </motion.nav>

          {/* User Profile */}
          {user && (
            <motion.div
              className="border-t p-3 mt-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted/80">
                <div className="w-9 h-9 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                  <User size={18} />
                </div>

                {(isOpen || isMobile) && (
                  <div className="flex flex-col overflow-hidden">
                    <span className="text-sm font-medium truncate">{user.email}</span>
                    <button
                      onClick={async () => {
                        await signOut();
                        window.location.href = '/';
                      }}
                      className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary"
                    >
                      <LogOut size={12} />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </motion.aside>
      </AnimatePresence>
    </>
  );
}
