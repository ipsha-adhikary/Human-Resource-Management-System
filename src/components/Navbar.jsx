import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, Menu, X, Building2 } from "lucide-react";
import SearchBar from "./SearchBar";
import ProfileDropdown from "./ProfileDropdown";

const NAV_ITEMS = ["Dashboard", "Employees", "Attendance", "Leave"];

export default function Navbar({ search, onSearch, user, onProfile, onLogout }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState("Dashboard");

  const linkClass = (label) =>
    `rounded-lg px-3 py-2 text-sm font-medium transition ${
      active === label
        ? "bg-blue-50 text-blue-700"
        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
    }`;

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 sm:px-6">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-blue-500 text-white shadow-md">
            <Building2 size={18} />
          </div>
          <span className="text-lg font-bold tracking-tight text-slate-800">HRMS</span>
        </div>

        {/* Desktop nav */}
        <nav className="ml-4 hidden items-center gap-1 lg:flex">
          {NAV_ITEMS.map((item) => (
            <button key={item} onClick={() => setActive(item)} className={linkClass(item)}>
              {item}
            </button>
          ))}
        </nav>

        {/* Search */}
        <div className="ml-auto hidden w-64 md:block xl:w-80">
          <SearchBar value={search} onChange={onSearch} />
        </div>

        {/* Right actions */}
        <div className="ml-auto flex items-center gap-2 md:ml-0">
          <button className="relative rounded-full p-2.5 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700">
            <Bell size={19} />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-rose-500 ring-2 ring-white" />
          </button>

          <ProfileDropdown
            name={user?.name}
            avatar={user?.avatar}
            onProfile={onProfile}
            onLogout={onLogout}
          />

          <button
            onClick={() => setMobileOpen((o) => !o)}
            className="rounded-lg p-2 text-slate-600 transition hover:bg-slate-100 lg:hidden"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-slate-200 lg:hidden"
          >
            <div className="space-y-1 px-4 py-3">
              <div className="mb-3 md:hidden">
                <SearchBar value={search} onChange={onSearch} />
              </div>
              {NAV_ITEMS.map((item) => (
                <button
                  key={item}
                  onClick={() => {
                    setActive(item);
                    setMobileOpen(false);
                  }}
                  className={`block w-full text-left ${linkClass(item)}`}
                >
                  {item}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
