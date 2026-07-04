import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Plus, Users, UserCheck, UserX } from "lucide-react";
import Navbar from "../components/Navbar.jsx";
import EmployeeCard from "../components/EmployeeCard.jsx";
import AttendanceWidget from "../components/AttendenceWidget.jsx";
import { EMPLOYEES } from "../data/employees.js";

const ROLE_USER = {
  admin: { name: "Admin User", avatar: "https://i.pravatar.cc/150?img=8" },
  employee: { name: "Ipsha Adhikary", avatar: "https://i.pravatar.cc/150?img=47" },
};

export default function Dashboard({ role = "employee" }) {
  const [search, setSearch] = useState("");
  const user = ROLE_USER[role] || ROLE_USER.employee;

  const handleSelect = (emp) => alert(`Opening profile: ${emp.name} (${emp.id})`);
  const handleLogout = () => alert("Logging out → Login page");
  const handleProfile = () => alert("Opening My Profile");


  const filtered = useMemo(
    () =>
      EMPLOYEES.filter((e) =>
        e.name.toLowerCase().includes(search.trim().toLowerCase())
      ),
    [search]
  );

  const stats = useMemo(
    () => ({
      total: EMPLOYEES.length,
      present: EMPLOYEES.filter((e) => e.status === "present").length,
      absent: EMPLOYEES.filter((e) => e.status === "absent").length,
    }),
    []
  );

  return (
    <div className="min-h-screen bg-slate-50 font-[Inter,system-ui,sans-serif] text-slate-900">
      <Navbar search={search} onSearch={setSearch} user={user} onProfile={handleProfile} onLogout={handleLogout} />

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
        {/* Header */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-800">
              {role === "admin" ? "Team Overview" : "Welcome back"}
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              {role === "admin"
                ? "Manage and monitor your organization at a glance."
                : `Hi ${user.name.split(" ")[0]}, here's your team today.`}
            </p>
          </div>
          {role === "admin" && (
            <button className="inline-flex items-center gap-2 self-start rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-blue-500/20 transition hover:bg-blue-700 active:scale-[0.98]">
              <Plus size={18} />
              New Employee
            </button>
          )}
        </div>

        {/* Stats */}
        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <StatCard icon={Users} label="Total Employees" value={stats.total} tone="blue" />
          <StatCard icon={UserCheck} label="Present Today" value={stats.present} tone="emerald" />
          <StatCard icon={UserX} label="Absent Today" value={stats.absent} tone="rose" />
        </div>

        {/* Content grid */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Left: employees */}
          <div className="lg:col-span-2">
            <div className="rounded-2xl border border-slate-200 bg-white/60 p-5 shadow-sm backdrop-blur">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-sm font-semibold text-slate-800">Employees</h2>
                <span className="text-xs text-slate-400">{filtered.length} results</span>
              </div>

              {filtered.length === 0 ? (
                <p className="py-12 text-center text-sm text-slate-400">
                  No employees match "{search}".
                </p>
              ) : (
                <motion.div
                  layout
                  className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4"
                >
                  {filtered.map((emp) => (
                    <EmployeeCard key={emp.id} employee={emp} onSelect={handleSelect} />
                  ))}
                </motion.div>
              )}
            </div>
          </div>

          {/* Right: attendance widget */}
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-24">
              <AttendanceWidget />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

const TONES = {
  blue: "bg-blue-50 text-blue-600",
  emerald: "bg-emerald-50 text-emerald-600",
  rose: "bg-rose-50 text-rose-600",
};

function StatCard({ icon: Icon, label, value, tone }) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${TONES[tone]}`}>
        <Icon size={22} />
      </div>
      <div>
        <p className="text-2xl font-bold text-slate-800">{value}</p>
        <p className="text-xs text-slate-500">{label}</p>
      </div>
    </div>
  );
}
