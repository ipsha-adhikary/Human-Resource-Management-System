import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, LogOut, ChevronDown } from "lucide-react";

export default function ProfileDropdown({ name = "User", avatar, onProfile, onLogout }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 rounded-full p-1 pr-2 transition hover:bg-slate-100"
      >
        <img
          src={avatar}
          alt={name}
          className="h-9 w-9 rounded-full object-cover ring-2 ring-white shadow-sm"
        />
        <ChevronDown
          size={16}
          className={`text-slate-500 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-2 w-56 overflow-hidden rounded-2xl border border-slate-200 bg-white/90 shadow-xl backdrop-blur-xl"
          >
            <div className="border-b border-slate-100 px-4 py-3">
              <p className="text-sm font-semibold text-slate-800">{name}</p>
              <p className="text-xs text-slate-500">View account</p>
            </div>
            <button
              onClick={() => {
                setOpen(false);
                onProfile && onProfile();
              }}
              className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-slate-700 transition hover:bg-blue-50"
            >
              <User size={16} className="text-blue-600" />
              My Profile
            </button>
            <button
              onClick={() => {
                setOpen(false);
                onLogout && onLogout();
              }}
              className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-rose-600 transition hover:bg-rose-50"
            >
              <LogOut size={16} />
              Logout
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
